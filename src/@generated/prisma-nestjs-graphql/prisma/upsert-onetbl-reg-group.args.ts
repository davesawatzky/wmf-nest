import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_groupWhereUniqueInput } from '../tbl-reg-group/tbl-reg-group-where-unique.input';
import { Type } from 'class-transformer';
import { tbl_reg_groupCreateInput } from '../tbl-reg-group/tbl-reg-group-create.input';
import { tbl_reg_groupUpdateInput } from '../tbl-reg-group/tbl-reg-group-update.input';

@ArgsType()
export class UpsertOnetblRegGroupArgs {

    @Field(() => tbl_reg_groupWhereUniqueInput, {nullable:false})
    @Type(() => tbl_reg_groupWhereUniqueInput)
    where!: tbl_reg_groupWhereUniqueInput;

    @Field(() => tbl_reg_groupCreateInput, {nullable:false})
    @Type(() => tbl_reg_groupCreateInput)
    create!: tbl_reg_groupCreateInput;

    @Field(() => tbl_reg_groupUpdateInput, {nullable:false})
    @Type(() => tbl_reg_groupUpdateInput)
    update!: tbl_reg_groupUpdateInput;
}
