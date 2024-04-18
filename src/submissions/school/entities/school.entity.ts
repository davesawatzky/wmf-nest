import { Field, ObjectType, Int } from '@nestjs/graphql'
import { SchoolGroup } from '../../school-group/entities/school-group.entity'
import { UserError } from '../../../common.entity'
import {Registration} from '@/submissions/registration/entities/registration.entity'

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
  schoolGroups?: SchoolGroup[]
  registration?: Registration
}

@ObjectType()
export class SchoolPayload {
  userErrors: UserError[]
  school?: School
}
