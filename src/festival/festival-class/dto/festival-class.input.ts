import { InputType, Field, Int, registerEnumType } from '@nestjs/graphql'
import { Type, Transform } from 'class-transformer'
import { PerformerType } from '@/common.entity'
import { IsDecimal, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min, isNotEmpty } from 'class-validator'



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

  @IsNumber({maxDecimalPlaces: 2})
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
