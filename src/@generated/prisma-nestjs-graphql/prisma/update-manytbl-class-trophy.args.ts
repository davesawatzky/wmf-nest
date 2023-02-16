import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_class_trophyUncheckedUpdateManyInput } from '../tbl-class-trophy/tbl-class-trophy-unchecked-update-many.input'
import { Type } from 'class-transformer'
import { tbl_class_trophyWhereInput } from '../tbl-class-trophy/tbl-class-trophy-where.input'

@ArgsType()
export class UpdateManytblClassTrophyArgs {
  @Field(() => tbl_class_trophyUncheckedUpdateManyInput, { nullable: false })
  @Type(() => tbl_class_trophyUncheckedUpdateManyInput)
  data!: tbl_class_trophyUncheckedUpdateManyInput

  @Field(() => tbl_class_trophyWhereInput, { nullable: true })
  @Type(() => tbl_class_trophyWhereInput)
  where?: tbl_class_trophyWhereInput
}
