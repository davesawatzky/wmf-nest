import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserError } from '@/common.entity.js'
import { School } from '@/submissions/school/entities/school.entity.js'

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
  photoPermission?: string
  school?: School
}

@ObjectType()
export class SchoolGroupPayload {
  userErrors: UserError[]
  schoolGroup?: SchoolGroup
}
