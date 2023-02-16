import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { ID } from '@nestjs/graphql'
import { tbl_subdiscipline } from '../tbl-subdiscipline/tbl-subdiscipline.model'
import { Tbl_disciplineCount } from '../prisma/tbl-discipline-count.output'

@ObjectType()
export class tbl_discipline {
  @Field(() => ID, { nullable: false })
  id!: number

  @Field(() => String, { nullable: false })
  name!: string

  @Field(() => [tbl_subdiscipline], { nullable: true })
  tbl_subdiscipline?: Array<tbl_subdiscipline>

  @Field(() => Tbl_disciplineCount, { nullable: false })
  _count?: Tbl_disciplineCount
}
