import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class tbl_class_trophyClassIDTrophyIDCompoundUniqueInput {

    @Field(() => Int, {nullable:false})
    classID!: number;

    @Field(() => Int, {nullable:false})
    trophyID!: number;
}
