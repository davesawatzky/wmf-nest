import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_unavailableWhereInput } from '../tbl-reg-unavailable/tbl-reg-unavailable-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManytblRegUnavailableArgs {

    @Field(() => tbl_reg_unavailableWhereInput, {nullable:true})
    @Type(() => tbl_reg_unavailableWhereInput)
    where?: tbl_reg_unavailableWhereInput;
}
