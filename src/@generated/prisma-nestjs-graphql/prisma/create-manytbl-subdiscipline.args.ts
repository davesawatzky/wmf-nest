import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_subdisciplineCreateManyInput } from '../tbl-subdiscipline/tbl-subdiscipline-create-many.input'
import { Type } from 'class-transformer'

@ArgsType()
export class CreateManytblSubdisciplineArgs {
  @Field(() => [tbl_subdisciplineCreateManyInput], { nullable: false })
  @Type(() => tbl_subdisciplineCreateManyInput)
  data!: Array<tbl_subdisciplineCreateManyInput>

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean
}
