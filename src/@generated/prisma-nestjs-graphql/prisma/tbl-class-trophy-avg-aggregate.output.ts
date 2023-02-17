import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class Tbl_class_trophyAvgAggregate {

    @Field(() => Float, {nullable:true})
    classID?: number;

    @Field(() => Float, {nullable:true})
    trophyID?: number;
}
