import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_classlistCreateManyTbl_levelInput } from './tbl-classlist-create-many-tbl-level.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_classlistCreateManyTbl_levelInputEnvelope {
  @Field(() => [tbl_classlistCreateManyTbl_levelInput], { nullable: false })
  @Type(() => tbl_classlistCreateManyTbl_levelInput)
  data!: Array<tbl_classlistCreateManyTbl_levelInput>

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean
}
