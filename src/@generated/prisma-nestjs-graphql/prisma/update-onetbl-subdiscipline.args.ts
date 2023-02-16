import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_subdisciplineUpdateInput } from '../tbl-subdiscipline/tbl-subdiscipline-update.input'
import { Type } from 'class-transformer'
import { tbl_subdisciplineWhereUniqueInput } from '../tbl-subdiscipline/tbl-subdiscipline-where-unique.input'

@ArgsType()
export class UpdateOnetblSubdisciplineArgs {
  @Field(() => tbl_subdisciplineUpdateInput, { nullable: false })
  @Type(() => tbl_subdisciplineUpdateInput)
  data!: tbl_subdisciplineUpdateInput

  @Field(() => tbl_subdisciplineWhereUniqueInput, { nullable: false })
  @Type(() => tbl_subdisciplineWhereUniqueInput)
  where!: tbl_subdisciplineWhereUniqueInput
}
