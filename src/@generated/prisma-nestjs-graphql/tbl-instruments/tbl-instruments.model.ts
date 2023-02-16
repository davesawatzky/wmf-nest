import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { ID } from '@nestjs/graphql'

@ObjectType()
export class tbl_instruments {
  @Field(() => ID, { nullable: false })
  id!: number

  @Field(() => String, { nullable: false, defaultValue: '0' })
  name!: string
}
