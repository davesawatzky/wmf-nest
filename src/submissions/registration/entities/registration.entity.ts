import { Field, ObjectType, Int, registerEnumType } from '@nestjs/graphql'
import { GraphQLDecimal } from 'prisma-graphql-type-decimal'
import { UserError, SGSLabel } from 'src/common.entity'
import { Performer } from '../../performer/entities/performer.entity'
import { User } from '../../../user/entities/user.entity'
import { RegisteredClass } from '../../registered-class/entities/registered-class.entity'
import { Group } from '../../group/entities/group.entity'
import { Community } from '../../community/entities/community.entity'
import { Teacher } from '../../teacher/entities/teacher.entity'
import { School } from '../../school/entities/school.entity'

registerEnumType(SGSLabel, {
  name: 'SGSLabel',
})

@ObjectType()
export class Registration {
  @Field(() => Int)
  id: number
  label?: string
  user: User
  performers?: Performer[]
  registeredClasses?: RegisteredClass[]
  groups?: Group[]
  communities?: Community[]
  teacher?: Teacher
  school?: School

  @Field(() => SGSLabel)
  performerType: SGSLabel

  @Field(() => GraphQLDecimal)
  totalAmt?: number

  @Field(() => GraphQLDecimal)
  payedAmt?: number
  transactionInfo?: string
  submission?: string
  submittedAt?: Date
  createdAt?: Date
  updatedAt?: Date
}

@ObjectType()
export class RegistrationPayload {
  userErrors?: UserError[]
  registration?: Registration
}
