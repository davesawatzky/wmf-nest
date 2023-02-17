import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_groupCreateInput } from '../tbl-reg-group/tbl-reg-group-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOnetblRegGroupArgs {

    @Field(() => tbl_reg_groupCreateInput, {nullable:false})
    @Type(() => tbl_reg_groupCreateInput)
    data!: tbl_reg_groupCreateInput;
}
