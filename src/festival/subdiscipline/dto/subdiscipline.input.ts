import { InputType, Field } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Transform, Type } from 'class-transformer'
import { SGSLabel } from 'src/common.entity'

@InputType()
export class SubdisciplineInput {
  name: string
  description?: string
  maxPerformers?: number
  minPerformers?: number

  @Field(() => SGSLabel)
  SGSLabel: SGSLabel

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  price?: Decimal
}
