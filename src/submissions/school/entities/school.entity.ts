import { Field, ObjectType, Int } from '@nestjs/graphql'
import { Community } from '../../community/entities/community.entity'
import { UserError } from 'src/common.entity'

@ObjectType()
export class School {
  @Field(() => Int)
  id: number
  name: string
  division?: string
  streetNumber?: string
  streetName?: string
  city?: string
  province?: string
  postalCode?: string
  phone?: string
  schoolGroups?: Community[]
}

@ObjectType()
export class SchoolPayload {
  userErrors: UserError[]
  school?: School
}
