import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_instrumentsCreateManyInput } from '../tbl-instruments/tbl-instruments-create-many.input'
import { Type } from 'class-transformer'

@ArgsType()
export class CreateManytblInstrumentsArgs {
  @Field(() => [tbl_instrumentsCreateManyInput], { nullable: false })
  @Type(() => tbl_instrumentsCreateManyInput)
  data!: Array<tbl_instrumentsCreateManyInput>

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean
}
