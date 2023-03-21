import { InputType, Field } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Transform, Type } from 'class-transformer'
import { SGS_label } from 'src/common.entity'

@InputType()
export class SubdisciplineInput {
  name: string
  description?: string
  maxPerformers?: number
  minPerformers?: number

  @Field(() => SGS_label)
  SGS_label: SGS_label

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  price?: Decimal
}
