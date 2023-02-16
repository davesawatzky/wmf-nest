import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'
import { tbl_classlistOrderByWithRelationInput } from '../tbl-classlist/tbl-classlist-order-by-with-relation.input'
import { Type } from 'class-transformer'
import { tbl_trophyOrderByWithRelationInput } from '../tbl-trophy/tbl-trophy-order-by-with-relation.input'

@InputType()
export class tbl_class_trophyOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  classID?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  trophyID?: keyof typeof SortOrder

  @Field(() => tbl_classlistOrderByWithRelationInput, { nullable: true })
  @Type(() => tbl_classlistOrderByWithRelationInput)
  tbl_classlist?: tbl_classlistOrderByWithRelationInput

  @Field(() => tbl_trophyOrderByWithRelationInput, { nullable: true })
  tbl_trophy?: tbl_trophyOrderByWithRelationInput
}
