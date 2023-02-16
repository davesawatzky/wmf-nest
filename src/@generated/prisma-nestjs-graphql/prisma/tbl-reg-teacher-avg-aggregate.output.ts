import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Float } from '@nestjs/graphql'

@ObjectType()
export class Tbl_reg_teacherAvgAggregate {
  @Field(() => Float, { nullable: true })
  id?: number

  @Field(() => Float, { nullable: true })
  regID?: number
}
