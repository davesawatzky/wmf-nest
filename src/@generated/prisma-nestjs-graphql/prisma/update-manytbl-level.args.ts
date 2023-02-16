import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_levelUpdateManyMutationInput } from '../tbl-level/tbl-level-update-many-mutation.input'
import { Type } from 'class-transformer'
import { tbl_levelWhereInput } from '../tbl-level/tbl-level-where.input'

@ArgsType()
export class UpdateManytblLevelArgs {
  @Field(() => tbl_levelUpdateManyMutationInput, { nullable: false })
  @Type(() => tbl_levelUpdateManyMutationInput)
  data!: tbl_levelUpdateManyMutationInput

  @Field(() => tbl_levelWhereInput, { nullable: true })
  @Type(() => tbl_levelWhereInput)
  where?: tbl_levelWhereInput
}
