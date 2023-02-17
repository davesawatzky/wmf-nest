import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class Tbl_sacredMaxAggregate {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:true})
    composer?: string;

    @Field(() => String, {nullable:true})
    largeWork?: string;

    @Field(() => String, {nullable:true})
    title?: string;
}
