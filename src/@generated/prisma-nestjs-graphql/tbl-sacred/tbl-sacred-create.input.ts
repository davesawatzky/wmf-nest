import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class tbl_sacredCreateInput {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    composer!: string;

    @Field(() => String, {nullable:false})
    largeWork!: string;

    @Field(() => String, {nullable:false})
    title!: string;
}
