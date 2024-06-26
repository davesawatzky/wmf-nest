import { InputType, Field } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Transform, Type } from 'class-transformer'
import { PerformerType } from '../../../common.entity'

@InputType()
export class SubdisciplineInput {
  name: string
  description?: string
  maxPerformers?: number
  minPerformers?: number

  @Field(() => PerformerType)
  performerType: PerformerType

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  price?: Decimal
}
