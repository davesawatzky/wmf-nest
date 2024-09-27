import { randomInt } from 'node:crypto'
import { PerformerType } from '@/common.entity'
import { PrismaService } from '@/prisma/prisma.service'
import { RegistrationService } from '@/submissions/registration/registration.service'
import { Submission } from '@/submissions/submission/entities/submission.entity'
import { Injectable } from '@nestjs/common'
import { tbl_registration } from '@prisma/client'

@Injectable()
export class SubmissionService {
  constructor(
    private prisma: PrismaService,
    private registrationService: RegistrationService,
  ) {}

  private requiredField = []

  async submissions(performerType?: PerformerType) {
    return await this.prisma.tbl_registration.findMany({
      where: {
        performerType,
      },
    })
  }

  async submit(id: tbl_registration['id']) {
    this.requiredField = await this.prisma.tbl_field_config.findMany()

    const performerType = (await this.registrationService.findOne(id))
      .performerType

    let verified = true
    let registration = {}

    switch (performerType) {
      case 'SOLO':
        registration = await this.prisma.tbl_registration.findUnique({
          where: { id },
          include: {
            tbl_reg_performer: true,
            // tbl_reg_teacher: true,
            tbl_reg_class: {
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
            // tbl_reg_teacher: true,
            tbl_reg_class: {
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
            // tbl_reg_teacher: true,
            tbl_reg_class: {
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
            // tbl_reg_teacher: true,
            tbl_reg_class: {
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
      submittedAt: new Date(),
      confirmation: `WMF-${id}-${randomInt(1000, 9999)}`,
    }

    // return {
    //   userErrors: [],
    //   submission: this.prisma.tbl_registration.update({
    //     where: { id },
    //     data: {
    //       submittedAt: submissionData.submittedAt,
    //       confirmation: submissionData.confirmation,
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
      if (Array.isArray(registration[key])) {
        return registration[key].every(val => this.emptyValueCheck(val, key))
      }
      else if (this.isObj(registration[key])) {
        return this.emptyValueCheck(registration[key], key)
      }
      else if (
        registration[key] === null
        || registration[key] === undefined
        || registration[key] === ''
      ) {
        const isRequired = this.requiredField.find((el) => {
          return el.tableName === tableName && el.fieldName === key
        })
        return !isRequired.submissionRequired
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
//     return this.emptyValueCheck(registeredClass, 'tbl_reg_class')
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
