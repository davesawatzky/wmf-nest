import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_subdisciplineScalarWhereInput } from './tbl-subdiscipline-scalar-where.input';
import { Type } from 'class-transformer';
import { tbl_subdisciplineUpdateManyMutationInput } from './tbl-subdiscipline-update-many-mutation.input';

@InputType()
export class tbl_subdisciplineUpdateManyWithWhereWithoutTbl_disciplineInput {

    @Field(() => tbl_subdisciplineScalarWhereInput, {nullable:false})
    @Type(() => tbl_subdisciplineScalarWhereInput)
    where!: tbl_subdisciplineScalarWhereInput;

    @Field(() => tbl_subdisciplineUpdateManyMutationInput, {nullable:false})
    @Type(() => tbl_subdisciplineUpdateManyMutationInput)
    data!: tbl_subdisciplineUpdateManyMutationInput;
}
