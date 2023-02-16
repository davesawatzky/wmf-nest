import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_levelWhereInput } from '../tbl-level/tbl-level-where.input'
import { Type } from 'class-transformer'
import { tbl_levelOrderByWithRelationInput } from '../tbl-level/tbl-level-order-by-with-relation.input'
import { tbl_levelWhereUniqueInput } from '../tbl-level/tbl-level-where-unique.input'
import { Int } from '@nestjs/graphql'
import { Tbl_levelScalarFieldEnum } from './tbl-level-scalar-field.enum'

@ArgsType()
export class FindFirsttblLevelOrThrowArgs {
  @Field(() => tbl_levelWhereInput, { nullable: true })
  @Type(() => tbl_levelWhereInput)
  where?: tbl_levelWhereInput

  @Field(() => [tbl_levelOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<tbl_levelOrderByWithRelationInput>

  @Field(() => tbl_levelWhereUniqueInput, { nullable: true })
  cursor?: tbl_levelWhereUniqueInput

  @Field(() => Int, { nullable: true })
  take?: number

  @Field(() => Int, { nullable: true })
  skip?: number

  @Field(() => [Tbl_levelScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof Tbl_levelScalarFieldEnum>
}
