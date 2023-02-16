import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { tbl_SGS } from '../prisma/tbl-sgs.enum'
import { Decimal } from '@prisma/client/runtime'
import { GraphQLDecimal } from 'prisma-graphql-type-decimal'
import { transformToDecimal } from 'prisma-graphql-type-decimal'
import { Transform } from 'class-transformer'
import { Type } from 'class-transformer'
import { tbl_class_trophyUncheckedCreateNestedManyWithoutTbl_classlistInput } from '../tbl-class-trophy/tbl-class-trophy-unchecked-create-nested-many-without-tbl-classlist.input'

@InputType()
export class tbl_classlistUncheckedCreateWithoutTbl_subdisciplineInput {
  @Field(() => Int, { nullable: true })
  id?: number

  @Field(() => String, { nullable: false })
  classNumber!: string

  @Field(() => Int, { nullable: false })
  categoryID!: number

  @Field(() => Int, { nullable: false })
  levelID!: number

  @Field(() => Int, { nullable: false })
  minSelection!: number

  @Field(() => Int, { nullable: false })
  maxSelection!: number

  @Field(() => String, { nullable: true })
  requiredSelection?: string

  @Field(() => tbl_SGS, { nullable: true })
  SGSlabel?: keyof typeof tbl_SGS

  @Field(() => GraphQLDecimal, { nullable: true })
  @Type(() => Object)
  @Transform(transformToDecimal)
  price?: Decimal

  @Field(
    () => tbl_class_trophyUncheckedCreateNestedManyWithoutTbl_classlistInput,
    { nullable: true },
  )
  @Type(
    () => tbl_class_trophyUncheckedCreateNestedManyWithoutTbl_classlistInput,
  )
  tbl_class_trophy?: tbl_class_trophyUncheckedCreateNestedManyWithoutTbl_classlistInput
}
