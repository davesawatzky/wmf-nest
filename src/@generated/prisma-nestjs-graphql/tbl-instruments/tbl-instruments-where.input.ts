import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { IntFilter } from '../prisma/int-filter.input'
import { StringFilter } from '../prisma/string-filter.input'

@InputType()
export class tbl_instrumentsWhereInput {
  @Field(() => [tbl_instrumentsWhereInput], { nullable: true })
  AND?: Array<tbl_instrumentsWhereInput>

  @Field(() => [tbl_instrumentsWhereInput], { nullable: true })
  OR?: Array<tbl_instrumentsWhereInput>

  @Field(() => [tbl_instrumentsWhereInput], { nullable: true })
  NOT?: Array<tbl_instrumentsWhereInput>

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter
}
