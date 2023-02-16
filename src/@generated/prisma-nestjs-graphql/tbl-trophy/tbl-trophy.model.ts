import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { ID } from '@nestjs/graphql'
import { tbl_class_trophy } from '../tbl-class-trophy/tbl-class-trophy.model'
import { Tbl_trophyCount } from '../prisma/tbl-trophy-count.output'

@ObjectType()
export class tbl_trophy {
  @Field(() => ID, { nullable: false })
  id!: number

  @Field(() => String, { nullable: false })
  name!: string

  @Field(() => String, { nullable: true })
  description!: string | null

  @Field(() => [tbl_class_trophy], { nullable: true })
  tbl_class_trophy?: Array<tbl_class_trophy>

  @Field(() => Tbl_trophyCount, { nullable: false })
  _count?: Tbl_trophyCount
}
