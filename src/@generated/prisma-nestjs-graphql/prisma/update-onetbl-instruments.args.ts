import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_instrumentsUpdateInput } from '../tbl-instruments/tbl-instruments-update.input';
import { Type } from 'class-transformer';
import { tbl_instrumentsWhereUniqueInput } from '../tbl-instruments/tbl-instruments-where-unique.input';

@ArgsType()
export class UpdateOnetblInstrumentsArgs {

    @Field(() => tbl_instrumentsUpdateInput, {nullable:false})
    @Type(() => tbl_instrumentsUpdateInput)
    data!: tbl_instrumentsUpdateInput;

    @Field(() => tbl_instrumentsWhereUniqueInput, {nullable:false})
    @Type(() => tbl_instrumentsWhereUniqueInput)
    where!: tbl_instrumentsWhereUniqueInput;
}
