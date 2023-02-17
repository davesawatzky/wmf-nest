import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_subdisciplineWhereInput } from '../tbl-subdiscipline/tbl-subdiscipline-where.input';
import { Type } from 'class-transformer';

@InputType()
export class Tbl_subdisciplineRelationFilter {

    @Field(() => tbl_subdisciplineWhereInput, {nullable:true})
    @Type(() => tbl_subdisciplineWhereInput)
    is?: tbl_subdisciplineWhereInput;

    @Field(() => tbl_subdisciplineWhereInput, {nullable:true})
    @Type(() => tbl_subdisciplineWhereInput)
    isNot?: tbl_subdisciplineWhereInput;
}
