import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_subdisciplineCreateWithoutTbl_disciplineInput } from './tbl-subdiscipline-create-without-tbl-discipline.input';
import { Type } from 'class-transformer';
import { tbl_subdisciplineCreateOrConnectWithoutTbl_disciplineInput } from './tbl-subdiscipline-create-or-connect-without-tbl-discipline.input';
import { tbl_subdisciplineUpsertWithWhereUniqueWithoutTbl_disciplineInput } from './tbl-subdiscipline-upsert-with-where-unique-without-tbl-discipline.input';
import { tbl_subdisciplineCreateManyTbl_disciplineInputEnvelope } from './tbl-subdiscipline-create-many-tbl-discipline-input-envelope.input';
import { tbl_subdisciplineWhereUniqueInput } from './tbl-subdiscipline-where-unique.input';
import { tbl_subdisciplineUpdateWithWhereUniqueWithoutTbl_disciplineInput } from './tbl-subdiscipline-update-with-where-unique-without-tbl-discipline.input';
import { tbl_subdisciplineUpdateManyWithWhereWithoutTbl_disciplineInput } from './tbl-subdiscipline-update-many-with-where-without-tbl-discipline.input';
import { tbl_subdisciplineScalarWhereInput } from './tbl-subdiscipline-scalar-where.input';

@InputType()
export class tbl_subdisciplineUncheckedUpdateManyWithoutTbl_disciplineNestedInput {

    @Field(() => [tbl_subdisciplineCreateWithoutTbl_disciplineInput], {nullable:true})
    @Type(() => tbl_subdisciplineCreateWithoutTbl_disciplineInput)
    create?: Array<tbl_subdisciplineCreateWithoutTbl_disciplineInput>;

    @Field(() => [tbl_subdisciplineCreateOrConnectWithoutTbl_disciplineInput], {nullable:true})
    @Type(() => tbl_subdisciplineCreateOrConnectWithoutTbl_disciplineInput)
    connectOrCreate?: Array<tbl_subdisciplineCreateOrConnectWithoutTbl_disciplineInput>;

    @Field(() => [tbl_subdisciplineUpsertWithWhereUniqueWithoutTbl_disciplineInput], {nullable:true})
    @Type(() => tbl_subdisciplineUpsertWithWhereUniqueWithoutTbl_disciplineInput)
    upsert?: Array<tbl_subdisciplineUpsertWithWhereUniqueWithoutTbl_disciplineInput>;

    @Field(() => tbl_subdisciplineCreateManyTbl_disciplineInputEnvelope, {nullable:true})
    @Type(() => tbl_subdisciplineCreateManyTbl_disciplineInputEnvelope)
    createMany?: tbl_subdisciplineCreateManyTbl_disciplineInputEnvelope;

    @Field(() => [tbl_subdisciplineWhereUniqueInput], {nullable:true})
    @Type(() => tbl_subdisciplineWhereUniqueInput)
    set?: Array<tbl_subdisciplineWhereUniqueInput>;

    @Field(() => [tbl_subdisciplineWhereUniqueInput], {nullable:true})
    @Type(() => tbl_subdisciplineWhereUniqueInput)
    disconnect?: Array<tbl_subdisciplineWhereUniqueInput>;

    @Field(() => [tbl_subdisciplineWhereUniqueInput], {nullable:true})
    @Type(() => tbl_subdisciplineWhereUniqueInput)
    delete?: Array<tbl_subdisciplineWhereUniqueInput>;

    @Field(() => [tbl_subdisciplineWhereUniqueInput], {nullable:true})
    @Type(() => tbl_subdisciplineWhereUniqueInput)
    connect?: Array<tbl_subdisciplineWhereUniqueInput>;

    @Field(() => [tbl_subdisciplineUpdateWithWhereUniqueWithoutTbl_disciplineInput], {nullable:true})
    @Type(() => tbl_subdisciplineUpdateWithWhereUniqueWithoutTbl_disciplineInput)
    update?: Array<tbl_subdisciplineUpdateWithWhereUniqueWithoutTbl_disciplineInput>;

    @Field(() => [tbl_subdisciplineUpdateManyWithWhereWithoutTbl_disciplineInput], {nullable:true})
    @Type(() => tbl_subdisciplineUpdateManyWithWhereWithoutTbl_disciplineInput)
    updateMany?: Array<tbl_subdisciplineUpdateManyWithWhereWithoutTbl_disciplineInput>;

    @Field(() => [tbl_subdisciplineScalarWhereInput], {nullable:true})
    @Type(() => tbl_subdisciplineScalarWhereInput)
    deleteMany?: Array<tbl_subdisciplineScalarWhereInput>;
}
