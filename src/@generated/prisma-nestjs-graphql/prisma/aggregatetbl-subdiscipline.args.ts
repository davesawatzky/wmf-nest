import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_subdisciplineWhereInput } from '../tbl-subdiscipline/tbl-subdiscipline-where.input'
import { Type } from 'class-transformer'
import { tbl_subdisciplineOrderByWithRelationInput } from '../tbl-subdiscipline/tbl-subdiscipline-order-by-with-relation.input'
import { tbl_subdisciplineWhereUniqueInput } from '../tbl-subdiscipline/tbl-subdiscipline-where-unique.input'
import { Int } from '@nestjs/graphql'

@ArgsType()
export class AggregatetblSubdisciplineArgs {
  @Field(() => tbl_subdisciplineWhereInput, { nullable: true })
  @Type(() => tbl_subdisciplineWhereInput)
  where?: tbl_subdisciplineWhereInput

  @Field(() => [tbl_subdisciplineOrderByWithRelationInput], { nullable: true })
  @Type(() => tbl_subdisciplineOrderByWithRelationInput)
  orderBy?: Array<tbl_subdisciplineOrderByWithRelationInput>

  @Field(() => tbl_subdisciplineWhereUniqueInput, { nullable: true })
  @Type(() => tbl_subdisciplineWhereUniqueInput)
  cursor?: tbl_subdisciplineWhereUniqueInput

  @Field(() => Int, { nullable: true })
  take?: number

  @Field(() => Int, { nullable: true })
  skip?: number
}
