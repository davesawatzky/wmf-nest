import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_class_trophyCreateManyInput } from '../tbl-class-trophy/tbl-class-trophy-create-many.input'
import { Type } from 'class-transformer'

@ArgsType()
export class CreateManytblClassTrophyArgs {
  @Field(() => [tbl_class_trophyCreateManyInput], { nullable: false })
  @Type(() => tbl_class_trophyCreateManyInput)
  data!: Array<tbl_class_trophyCreateManyInput>

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean
}
