import { Field, ObjectType, Int } from '@nestjs/graphql'
import { Community } from '../../community/entities/community.entity'
import { UserError } from 'src/common.entity'

@ObjectType()
export class School {
  @Field(() => Int)
  id: number
  name: string
  division?: string
  street_number?: string
  street_name?: string
  city?: string
  province?: string
  postal_code?: string
  phone?: string
  schoolGroups?: Community[]
}

@ObjectType()
export class SchoolPayload {
  userErrors: UserError[]
  school?: School
}
