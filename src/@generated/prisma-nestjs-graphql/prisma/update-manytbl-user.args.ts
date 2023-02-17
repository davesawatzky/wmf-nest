import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_userUpdateManyMutationInput } from '../tbl-user/tbl-user-update-many-mutation.input';
import { Type } from 'class-transformer';
import { tbl_userWhereInput } from '../tbl-user/tbl-user-where.input';

@ArgsType()
export class UpdateManytblUserArgs {

    @Field(() => tbl_userUpdateManyMutationInput, {nullable:false})
    @Type(() => tbl_userUpdateManyMutationInput)
    data!: tbl_userUpdateManyMutationInput;

    @Field(() => tbl_userWhereInput, {nullable:true})
    @Type(() => tbl_userWhereInput)
    where?: tbl_userWhereInput;
}
