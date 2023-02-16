import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Float } from '@nestjs/graphql'

@ObjectType()
export class Tbl_reg_selectionAvgAggregate {
  @Field(() => Float, { nullable: true })
  id?: number

  @Field(() => Float, { nullable: true })
  classpickID?: number
}
