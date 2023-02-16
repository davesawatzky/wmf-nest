import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'

@ObjectType()
export class Tbl_reg_unavailableSumAggregate {
  @Field(() => Int, { nullable: true })
  id?: number

  @Field(() => Int, { nullable: true })
  groupID?: number
}
