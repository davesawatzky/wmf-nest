import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime'
import { GraphQLDecimal } from 'prisma-graphql-type-decimal'
import { transformToDecimal } from 'prisma-graphql-type-decimal'
import { Transform } from 'class-transformer'
import { Type } from 'class-transformer'
import { tbl_reg_selectionUncheckedCreateNestedManyWithoutTbl_reg_classesInput } from '../tbl-reg-selection/tbl-reg-selection-unchecked-create-nested-many-without-tbl-reg-classes.input'

@InputType()
export class tbl_reg_classesUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number

  @Field(() => Int, { nullable: false })
  regID!: number

  @Field(() => String, { nullable: true })
  classNumber?: string

  @Field(() => String, { nullable: true })
  discipline?: string

  @Field(() => String, { nullable: true })
  subdiscipline?: string

  @Field(() => String, { nullable: true })
  level?: string

  @Field(() => String, { nullable: true })
  category?: string

  @Field(() => Int, { nullable: true })
  numberOfSelections?: number

  @Field(() => Int, { nullable: true })
  schoolCommunityId?: number

  @Field(() => GraphQLDecimal, { nullable: true })
  @Type(() => Object)
  @Transform(transformToDecimal)
  price?: Decimal

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | string

  @Field(
    () => tbl_reg_selectionUncheckedCreateNestedManyWithoutTbl_reg_classesInput,
    { nullable: true },
  )
  @Type(
    () => tbl_reg_selectionUncheckedCreateNestedManyWithoutTbl_reg_classesInput,
  )
  tbl_reg_selection?: tbl_reg_selectionUncheckedCreateNestedManyWithoutTbl_reg_classesInput
}
