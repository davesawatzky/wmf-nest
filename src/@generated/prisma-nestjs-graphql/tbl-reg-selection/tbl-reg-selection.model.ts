import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { tbl_reg_classes } from '../tbl-reg-classes/tbl-reg-classes.model';

@ObjectType()
export class tbl_reg_selection {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    classpickID!: number;

    @Field(() => String, {nullable:true})
    title!: string | null;

    @Field(() => String, {nullable:true})
    largerWork!: string | null;

    @Field(() => String, {nullable:true})
    movement!: string | null;

    @Field(() => String, {nullable:true})
    composer!: string | null;

    @Field(() => String, {nullable:false,defaultValue:'0:00'})
    duration!: string;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => tbl_reg_classes, {nullable:false})
    tbl_reg_classes?: tbl_reg_classes;
}
