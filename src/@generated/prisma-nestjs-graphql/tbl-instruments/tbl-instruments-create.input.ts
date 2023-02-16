import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'

@InputType()
export class tbl_instrumentsCreateInput {
  @Field(() => String, { nullable: true })
  name?: string
}
