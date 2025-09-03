import { Field, InputType, Int } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { Transform, Type } from 'class-transformer'
import { IsInt, IsOptional, IsString } from 'class-validator'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { PerformerType } from '@/common.entity'

@InputType()
export class SubdisciplineInput {
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  description?: string

  @Field(() => Int)
  disciplineID: number

  @IsInt()
  @IsOptional()
  @Field(() => Int)
  maxPerformers?: number

  @IsInt()
  @IsOptional()
  @Field(() => Int)
  minPerformers?: number

  performerType: PerformerType

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  price?: Decimal
}
