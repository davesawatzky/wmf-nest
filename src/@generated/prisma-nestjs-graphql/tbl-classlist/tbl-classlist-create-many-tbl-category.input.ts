import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { tbl_SGS } from '../prisma/tbl-sgs.enum'
import { Decimal } from '@prisma/client/runtime'
import { GraphQLDecimal } from 'prisma-graphql-type-decimal'
import { transformToDecimal } from 'prisma-graphql-type-decimal'
import { Transform } from 'class-transformer'
import { Type } from 'class-transformer'

@InputType()
export class tbl_classlistCreateManyTbl_categoryInput {
  @Field(() => Int, { nullable: true })
  id?: number

  @Field(() => String, { nullable: false })
  classNumber!: string

  @Field(() => Int, { nullable: false })
  subdisciplineID!: number

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
}
