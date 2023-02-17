import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_classlistCreateWithoutTbl_categoryInput } from './tbl-classlist-create-without-tbl-category.input';
import { Type } from 'class-transformer';
import { tbl_classlistCreateOrConnectWithoutTbl_categoryInput } from './tbl-classlist-create-or-connect-without-tbl-category.input';
import { tbl_classlistUpsertWithWhereUniqueWithoutTbl_categoryInput } from './tbl-classlist-upsert-with-where-unique-without-tbl-category.input';
import { tbl_classlistCreateManyTbl_categoryInputEnvelope } from './tbl-classlist-create-many-tbl-category-input-envelope.input';
import { tbl_classlistWhereUniqueInput } from './tbl-classlist-where-unique.input';
import { tbl_classlistUpdateWithWhereUniqueWithoutTbl_categoryInput } from './tbl-classlist-update-with-where-unique-without-tbl-category.input';
import { tbl_classlistUpdateManyWithWhereWithoutTbl_categoryInput } from './tbl-classlist-update-many-with-where-without-tbl-category.input';
import { tbl_classlistScalarWhereInput } from './tbl-classlist-scalar-where.input';

@InputType()
export class tbl_classlistUncheckedUpdateManyWithoutTbl_categoryNestedInput {

    @Field(() => [tbl_classlistCreateWithoutTbl_categoryInput], {nullable:true})
    @Type(() => tbl_classlistCreateWithoutTbl_categoryInput)
    create?: Array<tbl_classlistCreateWithoutTbl_categoryInput>;

    @Field(() => [tbl_classlistCreateOrConnectWithoutTbl_categoryInput], {nullable:true})
    @Type(() => tbl_classlistCreateOrConnectWithoutTbl_categoryInput)
    connectOrCreate?: Array<tbl_classlistCreateOrConnectWithoutTbl_categoryInput>;

    @Field(() => [tbl_classlistUpsertWithWhereUniqueWithoutTbl_categoryInput], {nullable:true})
    @Type(() => tbl_classlistUpsertWithWhereUniqueWithoutTbl_categoryInput)
    upsert?: Array<tbl_classlistUpsertWithWhereUniqueWithoutTbl_categoryInput>;

    @Field(() => tbl_classlistCreateManyTbl_categoryInputEnvelope, {nullable:true})
    @Type(() => tbl_classlistCreateManyTbl_categoryInputEnvelope)
    createMany?: tbl_classlistCreateManyTbl_categoryInputEnvelope;

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

    @Field(() => [tbl_classlistUpdateWithWhereUniqueWithoutTbl_categoryInput], {nullable:true})
    @Type(() => tbl_classlistUpdateWithWhereUniqueWithoutTbl_categoryInput)
    update?: Array<tbl_classlistUpdateWithWhereUniqueWithoutTbl_categoryInput>;

    @Field(() => [tbl_classlistUpdateManyWithWhereWithoutTbl_categoryInput], {nullable:true})
    @Type(() => tbl_classlistUpdateManyWithWhereWithoutTbl_categoryInput)
    updateMany?: Array<tbl_classlistUpdateManyWithWhereWithoutTbl_categoryInput>;

    @Field(() => [tbl_classlistScalarWhereInput], {nullable:true})
    @Type(() => tbl_classlistScalarWhereInput)
    deleteMany?: Array<tbl_classlistScalarWhereInput>;
}
