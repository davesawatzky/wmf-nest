import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_userCreateInput } from '../tbl-user/tbl-user-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOnetblUserArgs {

    @Field(() => tbl_userCreateInput, {nullable:false})
    @Type(() => tbl_userCreateInput)
    data!: tbl_userCreateInput;
}
