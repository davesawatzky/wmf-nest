import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_instrumentsCreateInput } from '../tbl-instruments/tbl-instruments-create.input'
import { Type } from 'class-transformer'

@ArgsType()
export class CreateOnetblInstrumentsArgs {
  @Field(() => tbl_instrumentsCreateInput, { nullable: false })
  @Type(() => tbl_instrumentsCreateInput)
  data!: tbl_instrumentsCreateInput
}
