import { Injectable } from '@nestjs/common'
import {
  MongoAbility,
  createMongoAbility,
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability'
import { User } from '../user/entities/user.entity'

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Users = 'users',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects = InferSubjects<typeof User> | 'all'

export type AppAbility = MongoAbility<[Action, Subjects]>

@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility,
    )

    if (user.admin) {
      can(Action.Users, 'all')
    } else {
      cannot(Action.Users, 'all').because(
        'your special message: only admins!!!',
      )
    }
    return build({
      detectSubjectType: (item): any => {
        item.constructor as ExtractSubjectType<Subjects>
      },
    })
  }
}
