import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_reg_communityCreateManyTbl_registrationInput } from './tbl-reg-community-create-many-tbl-registration.input';
import { Type } from 'class-transformer';

@InputType()
export class tbl_reg_communityCreateManyTbl_registrationInputEnvelope {

    @Field(() => [tbl_reg_communityCreateManyTbl_registrationInput], {nullable:false})
    @Type(() => tbl_reg_communityCreateManyTbl_registrationInput)
    data!: Array<tbl_reg_communityCreateManyTbl_registrationInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
