import { InputType, Field, Int, registerEnumType } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Type, Transform } from 'class-transformer'
import { SGSLabel } from 'src/common.entity'

registerEnumType(SGSLabel, {
  name: 'SGSLabel',
  description: 'SOLO, GROUP, SCHOOL, COMMUNITY',
})

@InputType()
export class FestivalClassInput {
  classNumber: string

  @Field(() => Int)
  subdisciplineID: number

  @Field(() => Int)
  levelID: number

  @Field(() => Int)
  categoryID: number

  @Field(() => Int)
  maxSelection: number

  @Field(() => Int)
  minSelection: number
  requiredSelection?: string

  @Field(() => SGSLabel)
  SGSLabel: SGSLabel

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
