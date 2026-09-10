import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserError } from '@/common.entity'
import { FestivalClass } from '@/festival/festival-class/entities/festival-class.entity'

@ObjectType()
export class ClassType {
  @Field(() => Int)
  id: number

  name: string
  description?: string

  @Field(() => [FestivalClass], { nullable: true })
  festivalClasses?: FestivalClass[]
}

@ObjectType()
export class ClassTypePayload {
  userErrors: UserError[]
  classType?: ClassType
}
