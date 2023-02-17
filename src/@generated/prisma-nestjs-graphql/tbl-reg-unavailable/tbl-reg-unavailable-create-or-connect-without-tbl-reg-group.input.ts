import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_reg_unavailableWhereUniqueInput } from './tbl-reg-unavailable-where-unique.input';
import { Type } from 'class-transformer';
import { tbl_reg_unavailableCreateWithoutTbl_reg_groupInput } from './tbl-reg-unavailable-create-without-tbl-reg-group.input';

@InputType()
export class tbl_reg_unavailableCreateOrConnectWithoutTbl_reg_groupInput {

    @Field(() => tbl_reg_unavailableWhereUniqueInput, {nullable:false})
    @Type(() => tbl_reg_unavailableWhereUniqueInput)
    where!: tbl_reg_unavailableWhereUniqueInput;

    @Field(() => tbl_reg_unavailableCreateWithoutTbl_reg_groupInput, {nullable:false})
    @Type(() => tbl_reg_unavailableCreateWithoutTbl_reg_groupInput)
    create!: tbl_reg_unavailableCreateWithoutTbl_reg_groupInput;
}
