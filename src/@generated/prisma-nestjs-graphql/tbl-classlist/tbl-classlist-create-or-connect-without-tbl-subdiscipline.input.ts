import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_classlistWhereUniqueInput } from './tbl-classlist-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_classlistCreateWithoutTbl_subdisciplineInput } from './tbl-classlist-create-without-tbl-subdiscipline.input'

@InputType()
export class tbl_classlistCreateOrConnectWithoutTbl_subdisciplineInput {
  @Field(() => tbl_classlistWhereUniqueInput, { nullable: false })
  @Type(() => tbl_classlistWhereUniqueInput)
  where!: tbl_classlistWhereUniqueInput

  @Field(() => tbl_classlistCreateWithoutTbl_subdisciplineInput, {
    nullable: false,
  })
  @Type(() => tbl_classlistCreateWithoutTbl_subdisciplineInput)
  create!: tbl_classlistCreateWithoutTbl_subdisciplineInput
}
