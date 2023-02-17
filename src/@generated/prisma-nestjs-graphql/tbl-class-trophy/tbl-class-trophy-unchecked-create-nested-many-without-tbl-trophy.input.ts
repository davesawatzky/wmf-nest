import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_class_trophyCreateWithoutTbl_trophyInput } from './tbl-class-trophy-create-without-tbl-trophy.input';
import { Type } from 'class-transformer';
import { tbl_class_trophyCreateOrConnectWithoutTbl_trophyInput } from './tbl-class-trophy-create-or-connect-without-tbl-trophy.input';
import { tbl_class_trophyCreateManyTbl_trophyInputEnvelope } from './tbl-class-trophy-create-many-tbl-trophy-input-envelope.input';
import { tbl_class_trophyWhereUniqueInput } from './tbl-class-trophy-where-unique.input';

@InputType()
export class tbl_class_trophyUncheckedCreateNestedManyWithoutTbl_trophyInput {

    @Field(() => [tbl_class_trophyCreateWithoutTbl_trophyInput], {nullable:true})
    @Type(() => tbl_class_trophyCreateWithoutTbl_trophyInput)
    create?: Array<tbl_class_trophyCreateWithoutTbl_trophyInput>;

    @Field(() => [tbl_class_trophyCreateOrConnectWithoutTbl_trophyInput], {nullable:true})
    @Type(() => tbl_class_trophyCreateOrConnectWithoutTbl_trophyInput)
    connectOrCreate?: Array<tbl_class_trophyCreateOrConnectWithoutTbl_trophyInput>;

    @Field(() => tbl_class_trophyCreateManyTbl_trophyInputEnvelope, {nullable:true})
    @Type(() => tbl_class_trophyCreateManyTbl_trophyInputEnvelope)
    createMany?: tbl_class_trophyCreateManyTbl_trophyInputEnvelope;

    @Field(() => [tbl_class_trophyWhereUniqueInput], {nullable:true})
    @Type(() => tbl_class_trophyWhereUniqueInput)
    connect?: Array<tbl_class_trophyWhereUniqueInput>;
}
