import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_userUpdateInput } from '../tbl-user/tbl-user-update.input';
import { Type } from 'class-transformer';
import { tbl_userWhereUniqueInput } from '../tbl-user/tbl-user-where-unique.input';

@ArgsType()
export class UpdateOnetblUserArgs {

    @Field(() => tbl_userUpdateInput, {nullable:false})
    @Type(() => tbl_userUpdateInput)
    data!: tbl_userUpdateInput;

    @Field(() => tbl_userWhereUniqueInput, {nullable:false})
    @Type(() => tbl_userWhereUniqueInput)
    where!: tbl_userWhereUniqueInput;
}
