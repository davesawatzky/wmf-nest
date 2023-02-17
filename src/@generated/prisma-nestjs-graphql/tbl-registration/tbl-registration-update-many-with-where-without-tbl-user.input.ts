import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_registrationScalarWhereInput } from './tbl-registration-scalar-where.input';
import { Type } from 'class-transformer';
import { tbl_registrationUpdateManyMutationInput } from './tbl-registration-update-many-mutation.input';

@InputType()
export class tbl_registrationUpdateManyWithWhereWithoutTbl_userInput {

    @Field(() => tbl_registrationScalarWhereInput, {nullable:false})
    @Type(() => tbl_registrationScalarWhereInput)
    where!: tbl_registrationScalarWhereInput;

    @Field(() => tbl_registrationUpdateManyMutationInput, {nullable:false})
    @Type(() => tbl_registrationUpdateManyMutationInput)
    data!: tbl_registrationUpdateManyMutationInput;
}
