import { InputType, Field, Int, registerEnumType } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Transform, Type } from 'class-transformer'
import { PerformerType } from '@/common.entity'
import {IsEnum, IsInt, IsOptional, IsString} from 'class-validator'
import {Discipline} from '@/festival/discipline/entities/discipline.entity'


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
