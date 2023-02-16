import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_classlistCreateManyTbl_categoryInput } from './tbl-classlist-create-many-tbl-category.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_classlistCreateManyTbl_categoryInputEnvelope {
  @Field(() => [tbl_classlistCreateManyTbl_categoryInput], { nullable: false })
  @Type(() => tbl_classlistCreateManyTbl_categoryInput)
  data!: Array<tbl_classlistCreateManyTbl_categoryInput>

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean
}
