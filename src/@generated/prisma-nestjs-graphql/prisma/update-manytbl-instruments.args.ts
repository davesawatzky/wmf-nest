import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_instrumentsUpdateManyMutationInput } from '../tbl-instruments/tbl-instruments-update-many-mutation.input';
import { Type } from 'class-transformer';
import { tbl_instrumentsWhereInput } from '../tbl-instruments/tbl-instruments-where.input';

@ArgsType()
export class UpdateManytblInstrumentsArgs {

    @Field(() => tbl_instrumentsUpdateManyMutationInput, {nullable:false})
    @Type(() => tbl_instrumentsUpdateManyMutationInput)
    data!: tbl_instrumentsUpdateManyMutationInput;

    @Field(() => tbl_instrumentsWhereInput, {nullable:true})
    @Type(() => tbl_instrumentsWhereInput)
    where?: tbl_instrumentsWhereInput;
}
