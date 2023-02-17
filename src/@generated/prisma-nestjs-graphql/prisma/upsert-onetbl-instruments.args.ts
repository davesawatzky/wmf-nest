import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_instrumentsWhereUniqueInput } from '../tbl-instruments/tbl-instruments-where-unique.input';
import { Type } from 'class-transformer';
import { tbl_instrumentsCreateInput } from '../tbl-instruments/tbl-instruments-create.input';
import { tbl_instrumentsUpdateInput } from '../tbl-instruments/tbl-instruments-update.input';

@ArgsType()
export class UpsertOnetblInstrumentsArgs {

    @Field(() => tbl_instrumentsWhereUniqueInput, {nullable:false})
    @Type(() => tbl_instrumentsWhereUniqueInput)
    where!: tbl_instrumentsWhereUniqueInput;

    @Field(() => tbl_instrumentsCreateInput, {nullable:false})
    @Type(() => tbl_instrumentsCreateInput)
    create!: tbl_instrumentsCreateInput;

    @Field(() => tbl_instrumentsUpdateInput, {nullable:false})
    @Type(() => tbl_instrumentsUpdateInput)
    update!: tbl_instrumentsUpdateInput;
}
