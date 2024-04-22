import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator'
import { PerformerType } from '@/common.entity'

@InputType()
export class FestivalClassInput {
  @IsString()
  @IsNotEmpty()
  classNumber: string

  @IsInt()
  @Min(1)
  @Field(() => Int)
  classTypeID: number

  @IsInt()
  @Min(1)
  @Field(() => Int)
  subdisciplineID: number

  @IsInt()
  @Min(1)
  @Field(() => Int)
  levelID: number

  @IsInt()
  @Min(1)
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

  @IsNotEmpty()
  performerType: PerformerType

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  price?: number

  @IsString()
  @IsNotEmpty()
  description: string
}

@InputType()
export class FestivalClassSearchArgs {
  @IsInt()
  @IsOptional()
  @Field(() => Int)
  subdisciplineID?: number

  @IsInt()
  @IsOptional()
  @Field(() => Int)
  levelID?: number

  @IsInt()
  @IsOptional()
  @Field(() => Int)
  categoryID?: number
}
