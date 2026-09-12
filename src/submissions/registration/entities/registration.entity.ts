import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import { IsNumber } from 'class-validator'

import { PerformerType, UserError } from '@/common.entity.js'
import { Community } from '@/submissions/community/entities/community.entity.js'
import { Group } from '@/submissions/group/entities/group.entity.js'
import { Performer } from '@/submissions/performer/entities/performer.entity.js'
import { RegisteredClass } from '@/submissions/registered-class/entities/registered-class.entity.js'
import { School } from '@/submissions/school/entities/school.entity.js'
import { User } from '@/user/entities/user.entity.js'

@ObjectType()
export class Registration {
  @Field(() => Int)
  id: number

  label?: string
  user: User
  performers?: Performer[]
  registeredClasses?: RegisteredClass[]
  group?: Group
  community?: Community
  teacher?: User
  school?: School

  performerType: PerformerType

  @Field(() => Float)
  @IsNumber({ maxDecimalPlaces: 2 })
  totalAmt?: number

  @Field(() => Float)
  @IsNumber({ maxDecimalPlaces: 2 })
  payedAmt?: number

  transactionInfo?: string
  confirmation?: string
  submittedAt?: Date
  createdAt?: Date
  updatedAt?: Date
}

@ObjectType()
export class RegistrationPayload {
  userErrors: UserError[]
  registration?: Registration
}
