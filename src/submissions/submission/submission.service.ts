import { Injectable } from '@nestjs/common'
import { SubmissionInput } from './dto/submission.input'
import { randomInt } from 'crypto'
import { SGS_label } from 'src/common.entity'
import { PrismaService } from 'src/prisma/prisma.service'
import {
  tbl_registration,
  tbl_reg_classes,
  tbl_reg_performer,
  tbl_reg_selection,
  tbl_reg_teacher,
} from '@prisma/client'
import { CommunityService } from '../community/community.service'
import { Community } from '../community/entities/community.entity'
import { GroupService } from '../group/group.service'
import { Group } from '../group/entities/group.entity'
import { PerformerService } from '../performer/performer.service'
import { Performer } from '../performer/entities/performer.entity'
import { RegisteredClassService } from '../registered-class/registered-class.service'
import { RegisteredClass } from '../registered-class/entities/registered-class.entity'
import { RegistrationService } from '../registration/registration.service'
import { SchoolService } from '../school/school.service'
import { School } from '../school/entities/school.entity'
import { SelectionService } from '../selection/selection.service'
import { Selection } from '../selection/entities/selection.entity'
import { TeacherService } from '../teacher/teacher.service'
import { Teacher } from '../teacher/entities/teacher.entity'
import { UserError } from 'src/common.entity'

export interface Result {
  submittable: boolean
  error?: UserError
}

export interface FullRegistration extends tbl_registration {
  tbl_reg_performer: tbl_reg_performer[]
  tbl_reg_teacher: tbl_reg_teacher
  tbl_reg_classes: tbl_reg_classes & {
    tbl_reg_selection: tbl_reg_selection[]
  }
}
@Injectable()
export class SubmissionService {
  constructor(
    private prisma: PrismaService,
    private communityService: CommunityService,
    private groupService: GroupService,
    private performerService: PerformerService,
    private registeredClassService: RegisteredClassService,
    private registrationService: RegistrationService,
    private schoolService: SchoolService,
    private selectionService: SelectionService,
    private teacherService: TeacherService,
  ) {}

  async submissions(performer_type?: SGS_label) {
    return this.prisma.tbl_registration.findMany({
      where: {
        performer_type,
      },
    })
  }

  async submit(id: tbl_registration['id']) {
    const performer_type = await (
      await this.registrationService.findOne(id)
    ).performer_type

    let verified = true
    let registration = {}

    switch (performer_type) {
      case 'SOLO':
        registration = await this.prisma.tbl_registration.findUnique({
          where: { id },
          include: {
            tbl_reg_performer: true,
            tbl_reg_teacher: true,
            tbl_reg_classes: {
              include: {
                tbl_reg_selection: true,
              },
            },
          },
        })
        console.log(registration)
        break

      case 'GROUP':
        registration = await this.prisma.tbl_registration.findUnique({
          where: { id },
          include: {
            tbl_reg_group: true,
            tbl_reg_performer: true,
            tbl_reg_teacher: true,
            tbl_reg_classes: {
              include: {
                tbl_reg_selection: true,
              },
            },
          },
        })
        console.log(registration)
        break

      case 'COMMUNITY':
        registration = await this.prisma.tbl_registration.findUnique({
          where: {
            id,
          },
          include: {
            tbl_reg_community: true,
            tbl_reg_teacher: true,
            tbl_reg_classes: {
              include: {
                tbl_reg_selection: true,
              },
            },
          },
        })
        console.log(registration)
        break

      case 'SCHOOL':
        const schoolID = (await this.schoolService.findOne(id)).id
        registration = await this.prisma.tbl_registration.findUnique({
          where: { id },
          include: {
            tbl_reg_school: true,
            tbl_reg_community: true, //TODO: Fix the School code.  Need to create a new db table.
            tbl_reg_teacher: true,
            tbl_reg_classes: {
              include: {
                tbl_reg_selection: true,
              },
            },
          },
        })
        break

      default:
        verified = false
        break
    }

    verified = this.emptyValueCheck(registration)

    if (verified === false) {
      return {
        userErrors: [
          {
            message:
              'Submission cancelled. Please complete all required fields before submitting.',
            field: [],
          },
        ],
        submission: null,
      }
    }

    const submissionData: SubmissionInput = await {
      submitted_at: new Date(),
      submission: 'WMF-' + id + '-' + randomInt(1000, 9999),
    }
    return {
      userErrors: [],
      submission: this.prisma.tbl_registration.update({
        where: { id },
        data: { ...submissionData },
      }),
    }
  }

  private async confirmCommunities(regID): Promise<boolean> {
    const communities: Community[] = await this.communityService.findAll(regID)
    const result = await communities.every((community) => {
      return this.emptyValueCheck(community)
    })
    return result
  }

  private async confirmGroups(regID): Promise<boolean> {
    const groups: Group[] = await this.groupService.findAll(regID)
    console.log(groups)
    const result = await groups.every((group) => {
      return this.emptyValueCheck(group)
    })
    return result
  }

  private async confirmPerformers(regID): Promise<boolean> {
    const performers: Performer[] = await this.performerService.findAll(regID)
    console.log(performers)
    const result = await performers.every((performer) => {
      return this.emptyValueCheck(performer)
    })
    return result
  }

  private async confirmRegisteredClasses(regID): Promise<boolean> {
    const registeredClasses: RegisteredClass[] =
      await this.registeredClassService.findAll(regID)
    const result = await registeredClasses.every((registeredClass) => {
      // const selectionResult = this.confirmSelections(registeredClass.id)
      // console.log(selectionResult)

      // if (selectionResult === false) {
      //   return false
      // }
      return this.emptyValueCheck(registeredClass)
    })
    return result
  }

  private async confirmSelections(registeredClassID): Promise<boolean> {
    const selections: Selection[] = await this.selectionService.findAll(
      registeredClassID,
    )
    console.log(selections)
    const result = await selections.every((selection) => {
      return this.emptyValueCheck(selection)
    })
    return result
  }

  private async confirmSchool(regID): Promise<boolean> {
    const school: School = await this.schoolService.findOne(regID)
    const result = await this.emptyValueCheck(school)
    return result
  }

  private async confirmTeacher(regID): Promise<boolean> {
    const teacher: Teacher = await this.teacherService.findOne(null, regID)
    const result = await this.emptyValueCheck(teacher)
    return result
  }

  private isObj(obj: any): boolean {
    return typeof obj === 'object' && obj !== null
  }

  private emptyValueCheck(registration: object): boolean {
    let result = true
    result = Object.keys(registration).every((key): boolean => {
      if (this.isObj(registration[key])) {
        return this.emptyValueCheck(registration[key])
      } else if (registration[key] instanceof Array) {
        registration[key].every((val) => this.emptyValueCheck(val))
      } else {
        return (
          registration[key] !== null &&
          registration[key] !== undefined &&
          registration[key] !== ''
        )
      }
    })
    return result
  }
}
