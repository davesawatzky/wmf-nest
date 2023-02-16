import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { ID } from '@nestjs/graphql'
import { tbl_classlist } from '../tbl-classlist/tbl-classlist.model'
import { Tbl_categoryCount } from '../prisma/tbl-category-count.output'

@ObjectType()
export class tbl_category {
  @Field(() => ID, { nullable: false })
  id!: number

  @Field(() => String, { nullable: false })
  name!: string

  @Field(() => String, { nullable: true })
  description!: string | null

  @Field(() => String, { nullable: true })
  requiredComposer!: string | null

  @Field(() => [tbl_classlist], { nullable: true })
  tbl_classlist?: Array<tbl_classlist>

  @Field(() => Tbl_categoryCount, { nullable: false })
  _count?: Tbl_categoryCount
}
