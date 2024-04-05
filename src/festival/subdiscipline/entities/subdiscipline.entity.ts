import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Type, Transform } from 'class-transformer'
import { Decimal } from '@prisma/client/runtime/library'
import {Discipline} from '../../discipline/entities/discipline.entity'
import { Category } from 'src/festival/category/entities/category.entity'
import { FestivalClass } from '../../festival-class/entities/festival-class.entity'
import { Level } from '../../level/entities/level.entity'
import {PerformerType, UserError} from '../../../common.entity'
import { tbl_subdiscipline_performer_type } from '@prisma/client'

registerEnumType(PerformerType, {name: 'PerformerType'})

@ObjectType()
export class Subdiscipline {
  @Field(() => Int)
  id: number
  name: string
  description?: string

  @Field(() => Int)
  maxPerformers?: number

  @Field(() => Int)
  minPerformers?: number

  @Field(() => PerformerType)
  performerType?: PerformerType | tbl_subdiscipline_performer_type

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  price?: Decimal
  
  categories?: Category[]  
  levels?: Level[]
  discipline?: Discipline
  festivalClasses?: FestivalClass[]
}

@ObjectType()
export class SubdisciplinePayload {
  userErrors: UserError[]
  subdiscipline?: Subdiscipline
}
