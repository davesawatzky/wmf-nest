import { Injectable } from '@nestjs/common'
import {
  MongoAbility,
  createMongoAbility,
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability'
import { User } from '../user/entities/user.entity'
import {ClassType} from '@/festival/class-type/entities/class-type.entity'
import {Category} from '@/festival/category/entities/category.entity'
import {Discipline} from '@/festival/discipline/entities/discipline.entity'
import {FestivalClass} from '@/festival/festival-class/entities/festival-class.entity'
import {Instrument} from '@/festival/instrument/entities/instrument.entity'
import {Level} from '@/festival/level/entities/level.entity'
import {Subdiscipline} from '@/festival/subdiscipline/entities/subdiscipline.entity'
import {Trophy} from '@/festival/trophy/entities/trophy.entity'
import {FieldConfig} from '@/submissions/field-config/entities/field-config.entity'
import {Group} from '@/submissions/group/entities/group.entity'
import {Community} from '@/submissions/community/entities/community.entity'
import {Performer} from '@/submissions/performer/entities/performer.entity'
import {RegisteredClass} from '@/submissions/registered-class/entities/registered-class.entity'
import {Registration} from '@/submissions/registration/entities/registration.entity'
import {School} from '@/submissions/school/entities/school.entity'
import {SchoolGroup} from '@/submissions/school-group/entities/school-group.entity'
import {Teacher} from '@/submissions/teacher/entities/teacher.entity'

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'Read',
  Users = 'users',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects = InferSubjects<
  typeof User |
  typeof Category |
  typeof ClassType |
  typeof Discipline |
  typeof FestivalClass | 
  typeof Instrument |
  typeof Level | 
  typeof Subdiscipline |
  typeof Trophy | 
  typeof Community | 
  typeof FieldConfig | 
  typeof Group | 
  typeof Performer |
  typeof RegisteredClass |
  typeof Registration |
  typeof School | 
  typeof SchoolGroup | 
  typeof Selection | 
  typeof Teacher> | 'all'

export type AppAbility = MongoAbility<[Action, Subjects]>

@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility
    )

    if (user.admin) {
      can(Action.Manage, 'all')
    } else {
      can(Action.Read, 'all').because(
        'your special message: only admins!!!'
      )
    }
    return build({
      detectSubjectType: (item): any => {
        item.constructor as ExtractSubjectType<Subjects>
      },
    })
  }
}
