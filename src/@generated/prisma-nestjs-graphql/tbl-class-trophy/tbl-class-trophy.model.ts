import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { tbl_classlist } from '../tbl-classlist/tbl-classlist.model';
import { tbl_trophy } from '../tbl-trophy/tbl-trophy.model';

@ObjectType()
export class tbl_class_trophy {

    @Field(() => Int, {nullable:false})
    classID!: number;

    @Field(() => Int, {nullable:false})
    trophyID!: number;

    @Field(() => tbl_classlist, {nullable:false})
    tbl_classlist?: tbl_classlist;

    @Field(() => tbl_trophy, {nullable:false})
    tbl_trophy?: tbl_trophy;
}
