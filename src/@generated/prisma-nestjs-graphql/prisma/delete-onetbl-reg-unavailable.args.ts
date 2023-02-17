import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_unavailableWhereUniqueInput } from '../tbl-reg-unavailable/tbl-reg-unavailable-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOnetblRegUnavailableArgs {

    @Field(() => tbl_reg_unavailableWhereUniqueInput, {nullable:false})
    @Type(() => tbl_reg_unavailableWhereUniqueInput)
    where!: tbl_reg_unavailableWhereUniqueInput;
}
