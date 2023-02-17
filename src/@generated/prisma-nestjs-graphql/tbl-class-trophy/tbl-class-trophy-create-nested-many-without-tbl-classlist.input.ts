import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_class_trophyCreateWithoutTbl_classlistInput } from './tbl-class-trophy-create-without-tbl-classlist.input';
import { Type } from 'class-transformer';
import { tbl_class_trophyCreateOrConnectWithoutTbl_classlistInput } from './tbl-class-trophy-create-or-connect-without-tbl-classlist.input';
import { tbl_class_trophyCreateManyTbl_classlistInputEnvelope } from './tbl-class-trophy-create-many-tbl-classlist-input-envelope.input';
import { tbl_class_trophyWhereUniqueInput } from './tbl-class-trophy-where-unique.input';

@InputType()
export class tbl_class_trophyCreateNestedManyWithoutTbl_classlistInput {

    @Field(() => [tbl_class_trophyCreateWithoutTbl_classlistInput], {nullable:true})
    @Type(() => tbl_class_trophyCreateWithoutTbl_classlistInput)
    create?: Array<tbl_class_trophyCreateWithoutTbl_classlistInput>;

    @Field(() => [tbl_class_trophyCreateOrConnectWithoutTbl_classlistInput], {nullable:true})
    @Type(() => tbl_class_trophyCreateOrConnectWithoutTbl_classlistInput)
    connectOrCreate?: Array<tbl_class_trophyCreateOrConnectWithoutTbl_classlistInput>;

    @Field(() => tbl_class_trophyCreateManyTbl_classlistInputEnvelope, {nullable:true})
    @Type(() => tbl_class_trophyCreateManyTbl_classlistInputEnvelope)
    createMany?: tbl_class_trophyCreateManyTbl_classlistInputEnvelope;

    @Field(() => [tbl_class_trophyWhereUniqueInput], {nullable:true})
    @Type(() => tbl_class_trophyWhereUniqueInput)
    connect?: Array<tbl_class_trophyWhereUniqueInput>;
}
