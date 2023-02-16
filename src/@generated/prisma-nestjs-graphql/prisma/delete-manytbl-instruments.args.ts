import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_instrumentsWhereInput } from '../tbl-instruments/tbl-instruments-where.input'
import { Type } from 'class-transformer'

@ArgsType()
export class DeleteManytblInstrumentsArgs {
  @Field(() => tbl_instrumentsWhereInput, { nullable: true })
  @Type(() => tbl_instrumentsWhereInput)
  where?: tbl_instrumentsWhereInput
}
