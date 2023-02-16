import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { ID } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { tbl_classlist } from '../tbl-classlist/tbl-classlist.model'
import { Tbl_levelCount } from '../prisma/tbl-level-count.output'

@ObjectType()
export class tbl_level {
  @Field(() => ID, { nullable: false })
  id!: number

  @Field(() => String, { nullable: false })
  name!: string

  @Field(() => String, { nullable: true })
  description!: string | null

  @Field(() => Int, { nullable: true })
  order!: number | null

  @Field(() => [tbl_classlist], { nullable: true })
  tbl_classlist?: Array<tbl_classlist>

  @Field(() => Tbl_levelCount, { nullable: false })
  _count?: Tbl_levelCount
}
