import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserError } from '@/common.entity'
import { Registration } from '@/submissions/registration/entities/registration.entity'
import { SchoolGroup } from '@/submissions/school-group/entities/school-group.entity'

@ObjectType()
export class School {
  @Field(() => Int)
  id: number

  name?: string
  division?: string
  address?: string
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
