import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_sacredUpdateManyMutationInput } from '../tbl-sacred/tbl-sacred-update-many-mutation.input';
import { Type } from 'class-transformer';
import { tbl_sacredWhereInput } from '../tbl-sacred/tbl-sacred-where.input';

@ArgsType()
export class UpdateManytblSacredArgs {

    @Field(() => tbl_sacredUpdateManyMutationInput, {nullable:false})
    @Type(() => tbl_sacredUpdateManyMutationInput)
    data!: tbl_sacredUpdateManyMutationInput;

    @Field(() => tbl_sacredWhereInput, {nullable:true})
    @Type(() => tbl_sacredWhereInput)
    where?: tbl_sacredWhereInput;
}
