import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { ID } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { GraphQLDecimal } from 'prisma-graphql-type-decimal'
import { Decimal } from '@prisma/client/runtime'
import { tbl_registration } from '../tbl-registration/tbl-registration.model'
import { tbl_reg_selection } from '../tbl-reg-selection/tbl-reg-selection.model'
import { Tbl_reg_classesCount } from '../prisma/tbl-reg-classes-count.output'

@ObjectType()
export class tbl_reg_classes {
  @Field(() => ID, { nullable: false })
  id!: number

  @Field(() => Int, { nullable: false })
  regID!: number

  @Field(() => String, { nullable: true })
  classNumber!: string | null

  @Field(() => String, { nullable: true })
  discipline!: string | null

  @Field(() => String, { nullable: true })
  subdiscipline!: string | null

  @Field(() => String, { nullable: true })
  level!: string | null

  @Field(() => String, { nullable: true })
  category!: string | null

  @Field(() => Int, { nullable: true })
  numberOfSelections!: number | null

  @Field(() => Int, { nullable: true })
  schoolCommunityId!: number | null

  @Field(() => GraphQLDecimal, { nullable: true })
  price!: Decimal | null

  @Field(() => Date, { nullable: false })
  createdAt!: Date

  @Field(() => Date, { nullable: false })
  updatedAt!: Date

  @Field(() => tbl_registration, { nullable: false })
  tbl_registration?: tbl_registration

  @Field(() => [tbl_reg_selection], { nullable: true })
  tbl_reg_selection?: Array<tbl_reg_selection>

  @Field(() => Tbl_reg_classesCount, { nullable: false })
  _count?: Tbl_reg_classesCount
}
