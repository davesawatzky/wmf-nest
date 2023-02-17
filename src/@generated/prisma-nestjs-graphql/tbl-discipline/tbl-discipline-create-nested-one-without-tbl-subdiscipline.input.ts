import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_disciplineCreateWithoutTbl_subdisciplineInput } from './tbl-discipline-create-without-tbl-subdiscipline.input';
import { Type } from 'class-transformer';
import { tbl_disciplineCreateOrConnectWithoutTbl_subdisciplineInput } from './tbl-discipline-create-or-connect-without-tbl-subdiscipline.input';
import { tbl_disciplineWhereUniqueInput } from './tbl-discipline-where-unique.input';

@InputType()
export class tbl_disciplineCreateNestedOneWithoutTbl_subdisciplineInput {

    @Field(() => tbl_disciplineCreateWithoutTbl_subdisciplineInput, {nullable:true})
    @Type(() => tbl_disciplineCreateWithoutTbl_subdisciplineInput)
    create?: tbl_disciplineCreateWithoutTbl_subdisciplineInput;

    @Field(() => tbl_disciplineCreateOrConnectWithoutTbl_subdisciplineInput, {nullable:true})
    @Type(() => tbl_disciplineCreateOrConnectWithoutTbl_subdisciplineInput)
    connectOrCreate?: tbl_disciplineCreateOrConnectWithoutTbl_subdisciplineInput;

    @Field(() => tbl_disciplineWhereUniqueInput, {nullable:true})
    @Type(() => tbl_disciplineWhereUniqueInput)
    connect?: tbl_disciplineWhereUniqueInput;
}
