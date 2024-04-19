import { Field, ObjectType, Int } from '@nestjs/graphql'
import { UserError } from '../../../common.entity'
import {School} from '@/submissions/school/entities/school.entity'

@ObjectType()
export class SchoolGroup {
  @Field(() => Int)
  id: number
  name?: string
  conflictPerformers?: string

  @Field(() => Int)
  groupSize?: number

  @Field(() => Int)
  chaperones?: number

  @Field(() => Int)
  wheelchairs?: number
  earliestTime?: string
  latestTime?: string
  unavailable?: string
  school?: School
}

@ObjectType()
export class SchoolGroupPayload {
  userErrors: UserError[]
  schoolGroup?: SchoolGroup
}
