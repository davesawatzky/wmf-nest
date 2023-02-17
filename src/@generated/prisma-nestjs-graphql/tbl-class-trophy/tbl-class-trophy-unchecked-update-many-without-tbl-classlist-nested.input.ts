import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_class_trophyCreateWithoutTbl_classlistInput } from './tbl-class-trophy-create-without-tbl-classlist.input';
import { Type } from 'class-transformer';
import { tbl_class_trophyCreateOrConnectWithoutTbl_classlistInput } from './tbl-class-trophy-create-or-connect-without-tbl-classlist.input';
import { tbl_class_trophyUpsertWithWhereUniqueWithoutTbl_classlistInput } from './tbl-class-trophy-upsert-with-where-unique-without-tbl-classlist.input';
import { tbl_class_trophyCreateManyTbl_classlistInputEnvelope } from './tbl-class-trophy-create-many-tbl-classlist-input-envelope.input';
import { tbl_class_trophyWhereUniqueInput } from './tbl-class-trophy-where-unique.input';
import { tbl_class_trophyUpdateWithWhereUniqueWithoutTbl_classlistInput } from './tbl-class-trophy-update-with-where-unique-without-tbl-classlist.input';
import { tbl_class_trophyUpdateManyWithWhereWithoutTbl_classlistInput } from './tbl-class-trophy-update-many-with-where-without-tbl-classlist.input';
import { tbl_class_trophyScalarWhereInput } from './tbl-class-trophy-scalar-where.input';

@InputType()
export class tbl_class_trophyUncheckedUpdateManyWithoutTbl_classlistNestedInput {

    @Field(() => [tbl_class_trophyCreateWithoutTbl_classlistInput], {nullable:true})
    @Type(() => tbl_class_trophyCreateWithoutTbl_classlistInput)
    create?: Array<tbl_class_trophyCreateWithoutTbl_classlistInput>;

    @Field(() => [tbl_class_trophyCreateOrConnectWithoutTbl_classlistInput], {nullable:true})
    @Type(() => tbl_class_trophyCreateOrConnectWithoutTbl_classlistInput)
    connectOrCreate?: Array<tbl_class_trophyCreateOrConnectWithoutTbl_classlistInput>;

    @Field(() => [tbl_class_trophyUpsertWithWhereUniqueWithoutTbl_classlistInput], {nullable:true})
    @Type(() => tbl_class_trophyUpsertWithWhereUniqueWithoutTbl_classlistInput)
    upsert?: Array<tbl_class_trophyUpsertWithWhereUniqueWithoutTbl_classlistInput>;

    @Field(() => tbl_class_trophyCreateManyTbl_classlistInputEnvelope, {nullable:true})
    @Type(() => tbl_class_trophyCreateManyTbl_classlistInputEnvelope)
    createMany?: tbl_class_trophyCreateManyTbl_classlistInputEnvelope;

    @Field(() => [tbl_class_trophyWhereUniqueInput], {nullable:true})
    @Type(() => tbl_class_trophyWhereUniqueInput)
    set?: Array<tbl_class_trophyWhereUniqueInput>;

    @Field(() => [tbl_class_trophyWhereUniqueInput], {nullable:true})
    @Type(() => tbl_class_trophyWhereUniqueInput)
    disconnect?: Array<tbl_class_trophyWhereUniqueInput>;

    @Field(() => [tbl_class_trophyWhereUniqueInput], {nullable:true})
    @Type(() => tbl_class_trophyWhereUniqueInput)
    delete?: Array<tbl_class_trophyWhereUniqueInput>;

    @Field(() => [tbl_class_trophyWhereUniqueInput], {nullable:true})
    @Type(() => tbl_class_trophyWhereUniqueInput)
    connect?: Array<tbl_class_trophyWhereUniqueInput>;

    @Field(() => [tbl_class_trophyUpdateWithWhereUniqueWithoutTbl_classlistInput], {nullable:true})
    @Type(() => tbl_class_trophyUpdateWithWhereUniqueWithoutTbl_classlistInput)
    update?: Array<tbl_class_trophyUpdateWithWhereUniqueWithoutTbl_classlistInput>;

    @Field(() => [tbl_class_trophyUpdateManyWithWhereWithoutTbl_classlistInput], {nullable:true})
    @Type(() => tbl_class_trophyUpdateManyWithWhereWithoutTbl_classlistInput)
    updateMany?: Array<tbl_class_trophyUpdateManyWithWhereWithoutTbl_classlistInput>;

    @Field(() => [tbl_class_trophyScalarWhereInput], {nullable:true})
    @Type(() => tbl_class_trophyScalarWhereInput)
    deleteMany?: Array<tbl_class_trophyScalarWhereInput>;
}
