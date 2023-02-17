import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_performerWhereInput } from '../tbl-reg-performer/tbl-reg-performer-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManytblRegPerformerArgs {

    @Field(() => tbl_reg_performerWhereInput, {nullable:true})
    @Type(() => tbl_reg_performerWhereInput)
    where?: tbl_reg_performerWhereInput;
}
