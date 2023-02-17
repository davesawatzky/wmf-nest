import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_classlistCreateWithoutTbl_subdisciplineInput } from './tbl-classlist-create-without-tbl-subdiscipline.input';
import { Type } from 'class-transformer';
import { tbl_classlistCreateOrConnectWithoutTbl_subdisciplineInput } from './tbl-classlist-create-or-connect-without-tbl-subdiscipline.input';
import { tbl_classlistUpsertWithWhereUniqueWithoutTbl_subdisciplineInput } from './tbl-classlist-upsert-with-where-unique-without-tbl-subdiscipline.input';
import { tbl_classlistCreateManyTbl_subdisciplineInputEnvelope } from './tbl-classlist-create-many-tbl-subdiscipline-input-envelope.input';
import { tbl_classlistWhereUniqueInput } from './tbl-classlist-where-unique.input';
import { tbl_classlistUpdateWithWhereUniqueWithoutTbl_subdisciplineInput } from './tbl-classlist-update-with-where-unique-without-tbl-subdiscipline.input';
import { tbl_classlistUpdateManyWithWhereWithoutTbl_subdisciplineInput } from './tbl-classlist-update-many-with-where-without-tbl-subdiscipline.input';
import { tbl_classlistScalarWhereInput } from './tbl-classlist-scalar-where.input';

@InputType()
export class tbl_classlistUpdateManyWithoutTbl_subdisciplineNestedInput {

    @Field(() => [tbl_classlistCreateWithoutTbl_subdisciplineInput], {nullable:true})
    @Type(() => tbl_classlistCreateWithoutTbl_subdisciplineInput)
    create?: Array<tbl_classlistCreateWithoutTbl_subdisciplineInput>;

    @Field(() => [tbl_classlistCreateOrConnectWithoutTbl_subdisciplineInput], {nullable:true})
    @Type(() => tbl_classlistCreateOrConnectWithoutTbl_subdisciplineInput)
    connectOrCreate?: Array<tbl_classlistCreateOrConnectWithoutTbl_subdisciplineInput>;

    @Field(() => [tbl_classlistUpsertWithWhereUniqueWithoutTbl_subdisciplineInput], {nullable:true})
    @Type(() => tbl_classlistUpsertWithWhereUniqueWithoutTbl_subdisciplineInput)
    upsert?: Array<tbl_classlistUpsertWithWhereUniqueWithoutTbl_subdisciplineInput>;

    @Field(() => tbl_classlistCreateManyTbl_subdisciplineInputEnvelope, {nullable:true})
    @Type(() => tbl_classlistCreateManyTbl_subdisciplineInputEnvelope)
    createMany?: tbl_classlistCreateManyTbl_subdisciplineInputEnvelope;

    @Field(() => [tbl_classlistWhereUniqueInput], {nullable:true})
    @Type(() => tbl_classlistWhereUniqueInput)
    set?: Array<tbl_classlistWhereUniqueInput>;

    @Field(() => [tbl_classlistWhereUniqueInput], {nullable:true})
    @Type(() => tbl_classlistWhereUniqueInput)
    disconnect?: Array<tbl_classlistWhereUniqueInput>;

    @Field(() => [tbl_classlistWhereUniqueInput], {nullable:true})
    @Type(() => tbl_classlistWhereUniqueInput)
    delete?: Array<tbl_classlistWhereUniqueInput>;

    @Field(() => [tbl_classlistWhereUniqueInput], {nullable:true})
    @Type(() => tbl_classlistWhereUniqueInput)
    connect?: Array<tbl_classlistWhereUniqueInput>;

    @Field(() => [tbl_classlistUpdateWithWhereUniqueWithoutTbl_subdisciplineInput], {nullable:true})
    @Type(() => tbl_classlistUpdateWithWhereUniqueWithoutTbl_subdisciplineInput)
    update?: Array<tbl_classlistUpdateWithWhereUniqueWithoutTbl_subdisciplineInput>;

    @Field(() => [tbl_classlistUpdateManyWithWhereWithoutTbl_subdisciplineInput], {nullable:true})
    @Type(() => tbl_classlistUpdateManyWithWhereWithoutTbl_subdisciplineInput)
    updateMany?: Array<tbl_classlistUpdateManyWithWhereWithoutTbl_subdisciplineInput>;

    @Field(() => [tbl_classlistScalarWhereInput], {nullable:true})
    @Type(() => tbl_classlistScalarWhereInput)
    deleteMany?: Array<tbl_classlistScalarWhereInput>;
}
