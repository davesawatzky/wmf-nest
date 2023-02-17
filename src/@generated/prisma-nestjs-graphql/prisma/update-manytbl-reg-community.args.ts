import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_communityUpdateManyMutationInput } from '../tbl-reg-community/tbl-reg-community-update-many-mutation.input';
import { Type } from 'class-transformer';
import { tbl_reg_communityWhereInput } from '../tbl-reg-community/tbl-reg-community-where.input';

@ArgsType()
export class UpdateManytblRegCommunityArgs {

    @Field(() => tbl_reg_communityUpdateManyMutationInput, {nullable:false})
    @Type(() => tbl_reg_communityUpdateManyMutationInput)
    data!: tbl_reg_communityUpdateManyMutationInput;

    @Field(() => tbl_reg_communityWhereInput, {nullable:true})
    @Type(() => tbl_reg_communityWhereInput)
    where?: tbl_reg_communityWhereInput;
}
