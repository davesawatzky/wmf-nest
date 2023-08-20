import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class FormErrorInput {
  @Field(() => Int)
  classErrors: number

  @Field(() => Int)
  groupInfoErrors: number

  @Field(() => Int)
  groupPerformersErrors: number

  @Field(() => Int)
  groupTeacherErrors: number

  @Field(() => Int)
  soloPerformerErrors: number

  @Field(() => Int)
  soloTeacherErrors: number

  @Field(() => Int)
  schoolInfoErrors: number

  @Field(() => Int)
  schoolTeacherErrors: number

  @Field(() => Int)
  schoolGroupErrors: number

  @Field(() => Int)
  schoolGroupsErrors: number

  @Field(() => Int)
  communityInfoErrors: number

  @Field(() => Int)
  communityTeacherErrors: number
}
