import { PerformerType, UserError } from '@/common.entity'
import { Community } from '@/submissions/community/entities/community.entity'
import { Group } from '@/submissions/group/entities/group.entity'
import { Performer } from '@/submissions/performer/entities/performer.entity'
import { RegisteredClass } from '@/submissions/registered-class/entities/registered-class.entity'
import { School } from '@/submissions/school/entities/school.entity'
import { User } from '@/user/entities/user.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { GraphQLDecimal } from 'prisma-graphql-type-decimal'

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

  @Field(() => GraphQLDecimal)
  totalAmt?: number

  @Field(() => GraphQLDecimal)
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
