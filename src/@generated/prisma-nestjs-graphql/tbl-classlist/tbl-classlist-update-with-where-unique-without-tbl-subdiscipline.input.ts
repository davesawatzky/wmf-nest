import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_classlistWhereUniqueInput } from './tbl-classlist-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_classlistUpdateWithoutTbl_subdisciplineInput } from './tbl-classlist-update-without-tbl-subdiscipline.input'

@InputType()
export class tbl_classlistUpdateWithWhereUniqueWithoutTbl_subdisciplineInput {
  @Field(() => tbl_classlistWhereUniqueInput, { nullable: false })
  @Type(() => tbl_classlistWhereUniqueInput)
  where!: tbl_classlistWhereUniqueInput

  @Field(() => tbl_classlistUpdateWithoutTbl_subdisciplineInput, {
    nullable: false,
  })
  @Type(() => tbl_classlistUpdateWithoutTbl_subdisciplineInput)
  data!: tbl_classlistUpdateWithoutTbl_subdisciplineInput
}
