import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_instrumentsWhereUniqueInput } from '../tbl-instruments/tbl-instruments-where-unique.input'
import { Type } from 'class-transformer'

@ArgsType()
export class FindUniquetblInstrumentsOrThrowArgs {
  @Field(() => tbl_instrumentsWhereUniqueInput, { nullable: false })
  @Type(() => tbl_instrumentsWhereUniqueInput)
  where!: tbl_instrumentsWhereUniqueInput
}
