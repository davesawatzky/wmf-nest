import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_registrationWhereInput } from '../tbl-registration/tbl-registration-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManytblRegistrationArgs {

    @Field(() => tbl_registrationWhereInput, {nullable:true})
    @Type(() => tbl_registrationWhereInput)
    where?: tbl_registrationWhereInput;
}
