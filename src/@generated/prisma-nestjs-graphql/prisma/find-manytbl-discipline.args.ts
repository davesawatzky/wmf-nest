import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_disciplineWhereInput } from '../tbl-discipline/tbl-discipline-where.input'
import { Type } from 'class-transformer'
import { tbl_disciplineOrderByWithRelationInput } from '../tbl-discipline/tbl-discipline-order-by-with-relation.input'
import { tbl_disciplineWhereUniqueInput } from '../tbl-discipline/tbl-discipline-where-unique.input'
import { Int } from '@nestjs/graphql'
import { Tbl_disciplineScalarFieldEnum } from './tbl-discipline-scalar-field.enum'

@ArgsType()
export class FindManytblDisciplineArgs {
  @Field(() => tbl_disciplineWhereInput, { nullable: true })
  @Type(() => tbl_disciplineWhereInput)
  where?: tbl_disciplineWhereInput

  @Field(() => [tbl_disciplineOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<tbl_disciplineOrderByWithRelationInput>

  @Field(() => tbl_disciplineWhereUniqueInput, { nullable: true })
  cursor?: tbl_disciplineWhereUniqueInput

  @Field(() => Int, { nullable: true })
  take?: number

  @Field(() => Int, { nullable: true })
  skip?: number

  @Field(() => [Tbl_disciplineScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof Tbl_disciplineScalarFieldEnum>
}
