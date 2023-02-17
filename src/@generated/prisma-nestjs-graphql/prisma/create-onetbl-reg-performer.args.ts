import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_performerCreateInput } from '../tbl-reg-performer/tbl-reg-performer-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOnetblRegPerformerArgs {

    @Field(() => tbl_reg_performerCreateInput, {nullable:false})
    @Type(() => tbl_reg_performerCreateInput)
    data!: tbl_reg_performerCreateInput;
}
