import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_classlistCreateManyTbl_subdisciplineInput } from './tbl-classlist-create-many-tbl-subdiscipline.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_classlistCreateManyTbl_subdisciplineInputEnvelope {
  @Field(() => [tbl_classlistCreateManyTbl_subdisciplineInput], {
    nullable: false,
  })
  @Type(() => tbl_classlistCreateManyTbl_subdisciplineInput)
  data!: Array<tbl_classlistCreateManyTbl_subdisciplineInput>

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean
}
