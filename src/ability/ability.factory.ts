import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
} from '@casl/ability'
import { Injectable } from '@nestjs/common'
import { Category } from '@/festival/category/entities/category.entity'
import { ClassType } from '@/festival/class-type/entities/class-type.entity'
import { Discipline } from '@/festival/discipline/entities/discipline.entity'
import { FestivalClass } from '@/festival/festival-class/entities/festival-class.entity'
import { Instrument } from '@/festival/instrument/entities/instrument.entity'
import { Item } from '@/festival/item/entities/item.entity'
import { Level } from '@/festival/level/entities/level.entity'
import { Subdiscipline } from '@/festival/subdiscipline/entities/subdiscipline.entity'
import { Trophy } from '@/festival/trophy/entities/trophy.entity'
import { CommunityGroup } from '@/submissions/community-group/entities/community-group.entity'
import { Community } from '@/submissions/community/entities/community.entity'
import { FieldConfig } from '@/submissions/field-config/entities/field-config.entity'
import { Group } from '@/submissions/group/entities/group.entity'
import { OrderItem } from '@/submissions/order-item/entities/order-item.entity'
import { Order } from '@/submissions/order/entities/order.entity'
import { Performer } from '@/submissions/performer/entities/performer.entity'
import { RegisteredClass } from '@/submissions/registered-class/entities/registered-class.entity'
import { Registration } from '@/submissions/registration/entities/registration.entity'
import { SchoolGroup } from '@/submissions/school-group/entities/school-group.entity'
import { School } from '@/submissions/school/entities/school.entity'
import { Selection } from '@/submissions/selection/entities/selection.entity'
import { Teacher } from '@/submissions/teacher/entities/teacher.entity'
import { User } from '@/user/entities/user.entity'

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects = InferSubjects<
  typeof User
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
