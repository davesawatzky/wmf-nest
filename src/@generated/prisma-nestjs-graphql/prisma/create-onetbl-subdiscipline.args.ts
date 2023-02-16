import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_subdisciplineCreateInput } from '../tbl-subdiscipline/tbl-subdiscipline-create.input'
import { Type } from 'class-transformer'

@ArgsType()
export class CreateOnetblSubdisciplineArgs {
  @Field(() => tbl_subdisciplineCreateInput, { nullable: false })
  @Type(() => tbl_subdisciplineCreateInput)
  data!: tbl_subdisciplineCreateInput
}
