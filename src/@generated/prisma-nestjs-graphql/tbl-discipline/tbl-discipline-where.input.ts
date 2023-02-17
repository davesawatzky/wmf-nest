import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { Tbl_subdisciplineListRelationFilter } from '../prisma/tbl-subdiscipline-list-relation-filter.input';
import { Type } from 'class-transformer';

@InputType()
export class tbl_disciplineWhereInput {

    @Field(() => [tbl_disciplineWhereInput], {nullable:true})
    AND?: Array<tbl_disciplineWhereInput>;

    @Field(() => [tbl_disciplineWhereInput], {nullable:true})
    OR?: Array<tbl_disciplineWhereInput>;

    @Field(() => [tbl_disciplineWhereInput], {nullable:true})
    NOT?: Array<tbl_disciplineWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    name?: StringFilter;

    @Field(() => Tbl_subdisciplineListRelationFilter, {nullable:true})
    @Type(() => Tbl_subdisciplineListRelationFilter)
    tbl_subdiscipline?: Tbl_subdisciplineListRelationFilter;
}
