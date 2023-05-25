import { InputType, Field, Int, registerEnumType } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Type, Transform } from 'class-transformer'
import { PerformerType } from 'src/common.entity'

registerEnumType(PerformerType, {
  name: 'PerformerType',
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
  maxSelections: number

  @Field(() => Int)
  minSelections: number
  requiredSelection?: string

  @Field(() => PerformerType)
  performerType: PerformerType

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
