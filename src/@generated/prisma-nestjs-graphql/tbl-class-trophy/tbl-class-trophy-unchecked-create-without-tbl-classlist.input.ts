import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class tbl_class_trophyUncheckedCreateWithoutTbl_classlistInput {

    @Field(() => Int, {nullable:false})
    trophyID!: number;
}
