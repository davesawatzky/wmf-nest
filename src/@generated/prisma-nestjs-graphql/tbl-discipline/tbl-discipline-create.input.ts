import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_subdisciplineCreateNestedManyWithoutTbl_disciplineInput } from '../tbl-subdiscipline/tbl-subdiscipline-create-nested-many-without-tbl-discipline.input';
import { Type } from 'class-transformer';

@InputType()
export class tbl_disciplineCreateInput {

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => tbl_subdisciplineCreateNestedManyWithoutTbl_disciplineInput, {nullable:true})
    @Type(() => tbl_subdisciplineCreateNestedManyWithoutTbl_disciplineInput)
    tbl_subdiscipline?: tbl_subdisciplineCreateNestedManyWithoutTbl_disciplineInput;
}
