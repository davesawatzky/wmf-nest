import { InputType, Field, Int, registerEnumType } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Type, Transform } from 'class-transformer'
import { PerformerType } from '../../../common.entity'
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator'

registerEnumType(PerformerType, {
  name: 'PerformerType',
  description: 'SOLO, GROUP, SCHOOL, COMMUNITY',
})

@InputType()
export class FestivalClassInput {
  @IsInt()
  @Field(() => Int)
  classTypeID: number

  @IsString()
  classNumber: string

  @IsInt()
  @Field(() => Int)
  subdisciplineID: number

  @IsInt()
  @Field(() => Int)
  levelID: number

  @IsInt()
  @Field(() => Int)
  categoryID: number

  @IsInt()
  @Field(() => Int)
  maxSelections: number

  @IsInt()
  @Field(() => Int)
  minSelections: number

  @IsString()
  @IsOptional()
  requiredSelection?: string

  @Field(() => PerformerType)
  performerType: PerformerType

  @IsNumber()
  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  price?: Decimal

  @IsString()
  @IsOptional()
  description?: string
}

@InputType()
export class FestivalClassSearchArgs {
  @IsInt()
  @Field(() => Int)
  subdisciplineID?: number

  @IsInt()
  @Field(() => Int)
  levelID?: number

  @IsInt()
  @Field(() => Int)
  categoryID?: number
}
