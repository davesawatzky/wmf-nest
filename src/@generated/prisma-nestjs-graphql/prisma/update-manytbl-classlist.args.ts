import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_classlistUpdateManyMutationInput } from '../tbl-classlist/tbl-classlist-update-many-mutation.input'
import { Type } from 'class-transformer'
import { tbl_classlistWhereInput } from '../tbl-classlist/tbl-classlist-where.input'

@ArgsType()
export class UpdateManytblClasslistArgs {
  @Field(() => tbl_classlistUpdateManyMutationInput, { nullable: false })
  @Type(() => tbl_classlistUpdateManyMutationInput)
  data!: tbl_classlistUpdateManyMutationInput

  @Field(() => tbl_classlistWhereInput, { nullable: true })
  @Type(() => tbl_classlistWhereInput)
  where?: tbl_classlistWhereInput
}
