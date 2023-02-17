import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_userWhereUniqueInput } from '../tbl-user/tbl-user-where-unique.input';
import { Type } from 'class-transformer';
import { tbl_userCreateInput } from '../tbl-user/tbl-user-create.input';
import { tbl_userUpdateInput } from '../tbl-user/tbl-user-update.input';

@ArgsType()
export class UpsertOnetblUserArgs {

    @Field(() => tbl_userWhereUniqueInput, {nullable:false})
    @Type(() => tbl_userWhereUniqueInput)
    where!: tbl_userWhereUniqueInput;

    @Field(() => tbl_userCreateInput, {nullable:false})
    @Type(() => tbl_userCreateInput)
    create!: tbl_userCreateInput;

    @Field(() => tbl_userUpdateInput, {nullable:false})
    @Type(() => tbl_userUpdateInput)
    update!: tbl_userUpdateInput;
}
