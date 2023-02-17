import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_subdisciplineWhereInput } from '../tbl-subdiscipline/tbl-subdiscipline-where.input';
import { Type } from 'class-transformer';

@InputType()
export class Tbl_subdisciplineListRelationFilter {

    @Field(() => tbl_subdisciplineWhereInput, {nullable:true})
    @Type(() => tbl_subdisciplineWhereInput)
    every?: tbl_subdisciplineWhereInput;

    @Field(() => tbl_subdisciplineWhereInput, {nullable:true})
    @Type(() => tbl_subdisciplineWhereInput)
    some?: tbl_subdisciplineWhereInput;

    @Field(() => tbl_subdisciplineWhereInput, {nullable:true})
    @Type(() => tbl_subdisciplineWhereInput)
    none?: tbl_subdisciplineWhereInput;
}
