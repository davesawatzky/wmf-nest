import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_reg_selectionCreateWithoutTbl_reg_classesInput } from './tbl-reg-selection-create-without-tbl-reg-classes.input';
import { Type } from 'class-transformer';
import { tbl_reg_selectionCreateOrConnectWithoutTbl_reg_classesInput } from './tbl-reg-selection-create-or-connect-without-tbl-reg-classes.input';
import { tbl_reg_selectionUpsertWithWhereUniqueWithoutTbl_reg_classesInput } from './tbl-reg-selection-upsert-with-where-unique-without-tbl-reg-classes.input';
import { tbl_reg_selectionCreateManyTbl_reg_classesInputEnvelope } from './tbl-reg-selection-create-many-tbl-reg-classes-input-envelope.input';
import { tbl_reg_selectionWhereUniqueInput } from './tbl-reg-selection-where-unique.input';
import { tbl_reg_selectionUpdateWithWhereUniqueWithoutTbl_reg_classesInput } from './tbl-reg-selection-update-with-where-unique-without-tbl-reg-classes.input';
import { tbl_reg_selectionUpdateManyWithWhereWithoutTbl_reg_classesInput } from './tbl-reg-selection-update-many-with-where-without-tbl-reg-classes.input';
import { tbl_reg_selectionScalarWhereInput } from './tbl-reg-selection-scalar-where.input';

@InputType()
export class tbl_reg_selectionUncheckedUpdateManyWithoutTbl_reg_classesNestedInput {

    @Field(() => [tbl_reg_selectionCreateWithoutTbl_reg_classesInput], {nullable:true})
    @Type(() => tbl_reg_selectionCreateWithoutTbl_reg_classesInput)
    create?: Array<tbl_reg_selectionCreateWithoutTbl_reg_classesInput>;

    @Field(() => [tbl_reg_selectionCreateOrConnectWithoutTbl_reg_classesInput], {nullable:true})
    @Type(() => tbl_reg_selectionCreateOrConnectWithoutTbl_reg_classesInput)
    connectOrCreate?: Array<tbl_reg_selectionCreateOrConnectWithoutTbl_reg_classesInput>;

    @Field(() => [tbl_reg_selectionUpsertWithWhereUniqueWithoutTbl_reg_classesInput], {nullable:true})
    @Type(() => tbl_reg_selectionUpsertWithWhereUniqueWithoutTbl_reg_classesInput)
    upsert?: Array<tbl_reg_selectionUpsertWithWhereUniqueWithoutTbl_reg_classesInput>;

    @Field(() => tbl_reg_selectionCreateManyTbl_reg_classesInputEnvelope, {nullable:true})
    @Type(() => tbl_reg_selectionCreateManyTbl_reg_classesInputEnvelope)
    createMany?: tbl_reg_selectionCreateManyTbl_reg_classesInputEnvelope;

    @Field(() => [tbl_reg_selectionWhereUniqueInput], {nullable:true})
    @Type(() => tbl_reg_selectionWhereUniqueInput)
    set?: Array<tbl_reg_selectionWhereUniqueInput>;

    @Field(() => [tbl_reg_selectionWhereUniqueInput], {nullable:true})
    @Type(() => tbl_reg_selectionWhereUniqueInput)
    disconnect?: Array<tbl_reg_selectionWhereUniqueInput>;

    @Field(() => [tbl_reg_selectionWhereUniqueInput], {nullable:true})
    @Type(() => tbl_reg_selectionWhereUniqueInput)
    delete?: Array<tbl_reg_selectionWhereUniqueInput>;

    @Field(() => [tbl_reg_selectionWhereUniqueInput], {nullable:true})
    @Type(() => tbl_reg_selectionWhereUniqueInput)
    connect?: Array<tbl_reg_selectionWhereUniqueInput>;

    @Field(() => [tbl_reg_selectionUpdateWithWhereUniqueWithoutTbl_reg_classesInput], {nullable:true})
    @Type(() => tbl_reg_selectionUpdateWithWhereUniqueWithoutTbl_reg_classesInput)
    update?: Array<tbl_reg_selectionUpdateWithWhereUniqueWithoutTbl_reg_classesInput>;

    @Field(() => [tbl_reg_selectionUpdateManyWithWhereWithoutTbl_reg_classesInput], {nullable:true})
    @Type(() => tbl_reg_selectionUpdateManyWithWhereWithoutTbl_reg_classesInput)
    updateMany?: Array<tbl_reg_selectionUpdateManyWithWhereWithoutTbl_reg_classesInput>;

    @Field(() => [tbl_reg_selectionScalarWhereInput], {nullable:true})
    @Type(() => tbl_reg_selectionScalarWhereInput)
    deleteMany?: Array<tbl_reg_selectionScalarWhereInput>;
}
