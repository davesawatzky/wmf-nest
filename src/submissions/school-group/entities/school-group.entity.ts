import { UserError } from '@/common.entity'
import { School } from '@/submissions/school/entities/school.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'

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
  photoPermission?: boolean
  school?: School
}

@ObjectType()
export class SchoolGroupPayload {
  userErrors: UserError[]
  schoolGroup?: SchoolGroup
}
