import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_classlistScalarWhereInput } from './tbl-classlist-scalar-where.input';
import { Type } from 'class-transformer';
import { tbl_classlistUpdateManyMutationInput } from './tbl-classlist-update-many-mutation.input';

@InputType()
export class tbl_classlistUpdateManyWithWhereWithoutTbl_categoryInput {

    @Field(() => tbl_classlistScalarWhereInput, {nullable:false})
    @Type(() => tbl_classlistScalarWhereInput)
    where!: tbl_classlistScalarWhereInput;

    @Field(() => tbl_classlistUpdateManyMutationInput, {nullable:false})
    @Type(() => tbl_classlistUpdateManyMutationInput)
    data!: tbl_classlistUpdateManyMutationInput;
}
