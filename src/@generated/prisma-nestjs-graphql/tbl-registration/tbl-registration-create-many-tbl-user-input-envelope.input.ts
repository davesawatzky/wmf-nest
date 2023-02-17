import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_registrationCreateManyTbl_userInput } from './tbl-registration-create-many-tbl-user.input';
import { Type } from 'class-transformer';

@InputType()
export class tbl_registrationCreateManyTbl_userInputEnvelope {

    @Field(() => [tbl_registrationCreateManyTbl_userInput], {nullable:false})
    @Type(() => tbl_registrationCreateManyTbl_userInput)
    data!: Array<tbl_registrationCreateManyTbl_userInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
