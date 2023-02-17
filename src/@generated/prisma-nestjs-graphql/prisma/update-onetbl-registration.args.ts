import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_registrationUpdateInput } from '../tbl-registration/tbl-registration-update.input';
import { Type } from 'class-transformer';
import { tbl_registrationWhereUniqueInput } from '../tbl-registration/tbl-registration-where-unique.input';

@ArgsType()
export class UpdateOnetblRegistrationArgs {

    @Field(() => tbl_registrationUpdateInput, {nullable:false})
    @Type(() => tbl_registrationUpdateInput)
    data!: tbl_registrationUpdateInput;

    @Field(() => tbl_registrationWhereUniqueInput, {nullable:false})
    @Type(() => tbl_registrationWhereUniqueInput)
    where!: tbl_registrationWhereUniqueInput;
}
