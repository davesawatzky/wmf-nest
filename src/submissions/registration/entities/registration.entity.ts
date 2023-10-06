import { Field, ObjectType, Int, registerEnumType } from '@nestjs/graphql'
import { GraphQLDecimal } from 'prisma-graphql-type-decimal'
import { UserError, PerformerType } from '../../../common.entity'
import { Performer } from '../../performer/entities/performer.entity'
import { User } from '../../../user/entities/user.entity'
import { RegisteredClass } from '../../registered-class/entities/registered-class.entity'
import { Group } from '../../group/entities/group.entity'
import { Community } from '../../community/entities/community.entity'
import { School } from '../../school/entities/school.entity'

registerEnumType(PerformerType, {
  name: 'PerformerType',
})

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

  @Field(() => PerformerType)
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
  registration: Registration
}
