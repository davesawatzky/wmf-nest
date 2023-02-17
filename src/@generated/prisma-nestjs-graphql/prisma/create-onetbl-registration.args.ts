import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_registrationCreateInput } from '../tbl-registration/tbl-registration-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOnetblRegistrationArgs {

    @Field(() => tbl_registrationCreateInput, {nullable:false})
    @Type(() => tbl_registrationCreateInput)
    data!: tbl_registrationCreateInput;
}
