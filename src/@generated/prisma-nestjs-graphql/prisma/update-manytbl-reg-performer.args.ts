import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_performerUpdateManyMutationInput } from '../tbl-reg-performer/tbl-reg-performer-update-many-mutation.input';
import { Type } from 'class-transformer';
import { tbl_reg_performerWhereInput } from '../tbl-reg-performer/tbl-reg-performer-where.input';

@ArgsType()
export class UpdateManytblRegPerformerArgs {

    @Field(() => tbl_reg_performerUpdateManyMutationInput, {nullable:false})
    @Type(() => tbl_reg_performerUpdateManyMutationInput)
    data!: tbl_reg_performerUpdateManyMutationInput;

    @Field(() => tbl_reg_performerWhereInput, {nullable:true})
    @Type(() => tbl_reg_performerWhereInput)
    where?: tbl_reg_performerWhereInput;
}
