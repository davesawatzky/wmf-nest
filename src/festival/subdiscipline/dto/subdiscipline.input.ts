import { InputType, Field } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Transform, Type } from 'class-transformer'
import { SGSlabel } from 'src/common.entity'

@InputType()
export class SubdisciplineInput {
  name: string
  description?: string
  maxPerformers?: number
  minPerformers?: number

  @Field(() => SGSlabel)
  SGSlabel: SGSlabel

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  price?: Decimal
}
