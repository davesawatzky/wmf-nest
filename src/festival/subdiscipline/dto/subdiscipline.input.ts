import { InputType, Field } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Transform, Type } from 'class-transformer'
import { PerformerType } from '../../../common.entity'
import { IsInt, IsOptional, IsString } from 'class-validator'

@InputType()
export class SubdisciplineInput {
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  description?: string

  @IsInt()
  @IsOptional()
  maxPerformers?: number

  @IsInt()
  @IsOptional()
  minPerformers?: number

  @Field(() => PerformerType)
  performerType: PerformerType

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  price?: Decimal
}
