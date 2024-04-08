import { InputType, Field, Int, registerEnumType } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Type, Transform } from 'class-transformer'
import { PerformerType } from '@/common.entity'
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, isNotEmpty } from 'class-validator'



@InputType()
export class FestivalClassInput {
  
  @IsString()
  classNumber: string
  
  @Field(() => Int)
  @IsInt()
  classTypeID: number

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

  @IsNotEmpty()
  performerType: PerformerType

  @IsNumber()
  @IsOptional()
  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  price?: Decimal

  @IsString()
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
