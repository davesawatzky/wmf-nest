import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
} from '@casl/ability'
import { Injectable } from '@nestjs/common'
import { Category } from '@/festival/category/entities/category.entity.js'
import { ClassType } from '@/festival/class-type/entities/class-type.entity.js'
import { Discipline } from '@/festival/discipline/entities/discipline.entity.js'
import { FestivalClass } from '@/festival/festival-class/entities/festival-class.entity.js'
import { Instrument } from '@/festival/instrument/entities/instrument.entity.js'
import { Item } from '@/festival/item/entities/item.entity.js'
import { Level } from '@/festival/level/entities/level.entity.js'
import { Subdiscipline } from '@/festival/subdiscipline/entities/subdiscipline.entity.js'
import { Trophy } from '@/festival/trophy/entities/trophy.entity.js'
import { CommunityGroup } from '@/submissions/community-group/entities/community-group.entity.js'
import { Community } from '@/submissions/community/entities/community.entity.js'
import { FieldConfig } from '@/submissions/field-config/entities/field-config.entity.js'
import { Group } from '@/submissions/group/entities/group.entity.js'
import { OrderItem } from '@/submissions/order-item/entities/order-item.entity.js'
import { Order } from '@/submissions/order/entities/order.entity.js'
import { Performer } from '@/submissions/performer/entities/performer.entity.js'
import { RegisteredClass } from '@/submissions/registered-class/entities/registered-class.entity.js'
import { Registration } from '@/submissions/registration/entities/registration.entity.js'
import { SchoolGroup } from '@/submissions/school-group/entities/school-group.entity.js'
import { School } from '@/submissions/school/entities/school.entity.js'
import { Selection } from '@/submissions/selection/entities/selection.entity.js'
import { Teacher } from '@/submissions/teacher/entities/teacher.entity.js'
import { User } from '@/user/entities/user.entity.js'

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects
  = | InferSubjects<
    | typeof User
    | typeof Category
    | typeof ClassType
    | typeof Discipline
    | typeof FestivalClass
    | typeof Instrument
    | typeof Level
    | typeof Subdiscipline
    | typeof Trophy
    | typeof Community
    | typeof CommunityGroup
    | typeof FieldConfig
    | typeof Group
    | typeof Performer
    | typeof RegisteredClass
    | typeof Registration
    | typeof School
    | typeof SchoolGroup
    | typeof Selection
    | typeof Teacher
    | typeof Order
    | typeof OrderItem
    | typeof Item
  >
  | 'all'
  | 'admin'

export type AppAbility = MongoAbility<[Action, Subjects]>

@Injectable()
export class AbilityFactory {
  defineAbility(currentUser: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility,
    )
    if (currentUser.roles.includes('admin')) {
      can(Action.Manage, 'all')
    }
    else {
      cannot(Action.Manage, 'admin').because('Admins only')
      can(Action.Manage, Teacher)
      can(Action.Manage, Selection)
      can(Action.Manage, SchoolGroup)
      can(Action.Manage, School)
      can(Action.Manage, Community)
      can(Action.Manage, CommunityGroup)
      can(Action.Manage, RegisteredClass)
      can(Action.Manage, Registration)
      can(Action.Manage, Group)
      can(Action.Manage, Performer)
      can(Action.Manage, Order)
      can(Action.Manage, OrderItem)
      can(Action.Read, Item)
      can(Action.Read, FestivalClass)
      can(Action.Read, FieldConfig)
      can(Action.Read, Trophy)
      can(Action.Read, Subdiscipline)
      can(Action.Read, Level)
      can(Action.Read, Instrument)
      can(Action.Read, Discipline)
      can(Action.Read, Category)
      can(Action.Read, ClassType)
      can([Action.Read, Action.Update], User)
    }
    return build({
      detectSubjectType: (item): any => {
        return item.constructor as ExtractSubjectType<Subjects>
      },
    })
  }
}
