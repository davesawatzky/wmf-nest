import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_registrationWhereUniqueInput } from '../tbl-registration/tbl-registration-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniquetblRegistrationOrThrowArgs {

    @Field(() => tbl_registrationWhereUniqueInput, {nullable:false})
    @Type(() => tbl_registrationWhereUniqueInput)
    where!: tbl_registrationWhereUniqueInput;
}
