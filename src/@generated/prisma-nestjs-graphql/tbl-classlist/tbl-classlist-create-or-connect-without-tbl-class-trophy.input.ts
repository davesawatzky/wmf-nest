import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_classlistWhereUniqueInput } from './tbl-classlist-where-unique.input';
import { Type } from 'class-transformer';
import { tbl_classlistCreateWithoutTbl_class_trophyInput } from './tbl-classlist-create-without-tbl-class-trophy.input';

@InputType()
export class tbl_classlistCreateOrConnectWithoutTbl_class_trophyInput {

    @Field(() => tbl_classlistWhereUniqueInput, {nullable:false})
    @Type(() => tbl_classlistWhereUniqueInput)
    where!: tbl_classlistWhereUniqueInput;

    @Field(() => tbl_classlistCreateWithoutTbl_class_trophyInput, {nullable:false})
    @Type(() => tbl_classlistCreateWithoutTbl_class_trophyInput)
    create!: tbl_classlistCreateWithoutTbl_class_trophyInput;
}
