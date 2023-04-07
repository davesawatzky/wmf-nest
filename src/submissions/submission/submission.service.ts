import { Injectable } from '@nestjs/common'
import { randomInt } from 'crypto'
import { SGS_label } from 'src/common.entity'
import { PrismaService } from 'src/prisma/prisma.service'
import { tbl_registration } from '@prisma/client'
import { Submission, SubmissionPayload } from './entities/submission.entity'
import { RegistrationService } from '../registration/registration.service'

@Injectable()
export class SubmissionService {
  constructor(
    private prisma: PrismaService,
    private registrationService: RegistrationService,
  ) {}

  private requiredField = []

  async submissions(performer_type?: SGS_label) {
    return this.prisma.tbl_registration.findMany({
      where: {
        performer_type,
      },
    })
  }

  async submit(id: tbl_registration['id']): Promise<SubmissionPayload> {
    this.requiredField = await this.prisma.tbl_field_config.findMany()

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

        break

      case 'SCHOOL':
        registration = await this.prisma.tbl_registration.findUnique({
          where: { id },
          include: {
            tbl_reg_school: {
              include: {
                tbl_reg_schoolgroup: true,
              },
            },
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

    verified = this.emptyValueCheck(registration, 'tbl_registration')

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

    const submissionData: Submission = await {
      submitted_at: new Date(),
      submission: 'WMF-' + id + '-' + randomInt(1000, 9999),
    }

    // return {
    //   userErrors: [],
    //   submission: this.prisma.tbl_registration.update({
    //     where: { id },
    //     data: {
    //       submitted_at: submissionData.submitted_at,
    //       submission: submissionData.submission,
    //     },
    //   }),
    // }

    return (
      await this.prisma.tbl_registration.update({
        where: { id },
        data: { ...submissionData },
      }),
      {
        userErrors: [],
        submission: submissionData,
      }
    )
  }

  private isObj(obj: any): boolean {
    return typeof obj === 'object' && obj !== null
  }

  private emptyValueCheck(registration: object, tableName: string): boolean {
    let result = true

    result = Object.keys(registration).every((key): boolean => {
      if (registration[key] instanceof Array) {
        return registration[key].every((val) => this.emptyValueCheck(val, key))
      } else if (this.isObj(registration[key])) {
        return this.emptyValueCheck(registration[key], key)
      } else if (
        registration[key] === null ||
        registration[key] === undefined ||
        registration[key] === ''
      ) {
        const isRequired = this.requiredField.find((el) => {
          return el.table_name == tableName && el.field_name == key
        })
        return !isRequired.submission_required
      }
      return true
    })
    return result
  }
}

// private async confirmCommunities(regID): Promise<boolean> {
//   const communities: Community[] = await this.communityService.findAll(regID)
//   const result = await communities.every((community) => {
//     return this.emptyValueCheck(community, 'tbl_reg_community')
//   })
//   return result
// }

// private async confirmGroups(regID): Promise<boolean> {
//   const groups: Group[] = await this.groupService.findAll(regID)
//   console.log(groups)
//   const result = await groups.every((group) => {
//     return this.emptyValueCheck(group, 'tbl_reg_group')
//   })
//   return result
// }

// private async confirmPerformers(regID): Promise<boolean> {
//   const performers: Performer[] = await this.performerService.findAll(regID)
//   console.log(performers)
//   const result = await performers.every((performer) => {
//     return this.emptyValueCheck(performer, 'tbl_reg_performer')
//   })
//   return result
// }

// private async confirmRegisteredClasses(regID): Promise<boolean> {
//   const registeredClasses: RegisteredClass[] =
//     await this.registeredClassService.findAll(regID)
//   const result = await registeredClasses.every((registeredClass) => {
// const selectionResult = this.confirmSelections(registeredClass.id)
// console.log(selectionResult)

// if (selectionResult === false) {
//   return false
// }
//     return this.emptyValueCheck(registeredClass, 'tbl_reg_classes')
//   })
//   return result
// }

// private async confirmSelections(registeredClassID): Promise<boolean> {
//   const selections: Selection[] = await this.selectionService.findAll(
//     registeredClassID,
//   )
//   console.log(selections)
//   const result = await selections.every((selection) => {
//     return this.emptyValueCheck(selection, 'tbl_reg_selection')
//   })
//   return result
// }

// private async confirmSchool(regID): Promise<boolean> {
//   const school: School = await this.schoolService.findOne(regID)
//   const result = await this.emptyValueCheck(school, 'tbl_reg_school')
//   return result
// }

// private async confirmTeacher(regID): Promise<boolean> {
//   const teacher: Teacher = await this.teacherService.findOne(null, regID)
//   const result = await this.emptyValueCheck(teacher, 'tbl_reg_teacher')
//   return result
// }
