import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_sacredWhereUniqueInput } from '../tbl-sacred/tbl-sacred-where-unique.input';
import { Type } from 'class-transformer';
import { tbl_sacredCreateInput } from '../tbl-sacred/tbl-sacred-create.input';
import { tbl_sacredUpdateInput } from '../tbl-sacred/tbl-sacred-update.input';

@ArgsType()
export class UpsertOnetblSacredArgs {

    @Field(() => tbl_sacredWhereUniqueInput, {nullable:false})
    @Type(() => tbl_sacredWhereUniqueInput)
    where!: tbl_sacredWhereUniqueInput;

    @Field(() => tbl_sacredCreateInput, {nullable:false})
    @Type(() => tbl_sacredCreateInput)
    create!: tbl_sacredCreateInput;

    @Field(() => tbl_sacredUpdateInput, {nullable:false})
    @Type(() => tbl_sacredUpdateInput)
    update!: tbl_sacredUpdateInput;
}
