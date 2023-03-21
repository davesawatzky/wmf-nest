import { InputType, Field, Int, registerEnumType } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Type, Transform } from 'class-transformer'
import { SGS_label } from 'src/common.entity'

registerEnumType(SGS_label, {
  name: 'SGS_label',
  description: 'SOLO, GROUP, SCHOOL, COMMUNITY',
})

@InputType()
export class FestivalClassInput {
  class_number: string

  @Field(() => Int)
  subdisciplineID: number

  @Field(() => Int)
  levelID: number

  @Field(() => Int)
  categoryID: number

  @Field(() => Int)
  max_selection: number

  @Field(() => Int)
  min_selection: number
  required_selection?: string

  @Field(() => SGS_label)
  SGS_label: SGS_label

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  price?: Decimal
}

@InputType()
export class FestivalClassSearchArgs {
  @Field(() => Int)
  subdisciplineID?: number

  @Field(() => Int)
  levelID?: number

  @Field(() => Int)
  categoryID?: number
}
