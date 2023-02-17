import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';

@ObjectType()
export class tbl_sacred {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    composer!: string;

    @Field(() => String, {nullable:false})
    largeWork!: string;

    @Field(() => String, {nullable:false})
    title!: string;
}
