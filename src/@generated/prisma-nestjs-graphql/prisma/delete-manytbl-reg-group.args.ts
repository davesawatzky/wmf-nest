import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_groupWhereInput } from '../tbl-reg-group/tbl-reg-group-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManytblRegGroupArgs {

    @Field(() => tbl_reg_groupWhereInput, {nullable:true})
    @Type(() => tbl_reg_groupWhereInput)
    where?: tbl_reg_groupWhereInput;
}
