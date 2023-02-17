import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { Tbl_classlistRelationFilter } from '../prisma/tbl-classlist-relation-filter.input';
import { Type } from 'class-transformer';
import { Tbl_trophyRelationFilter } from '../prisma/tbl-trophy-relation-filter.input';

@InputType()
export class tbl_class_trophyWhereInput {

    @Field(() => [tbl_class_trophyWhereInput], {nullable:true})
    AND?: Array<tbl_class_trophyWhereInput>;

    @Field(() => [tbl_class_trophyWhereInput], {nullable:true})
    OR?: Array<tbl_class_trophyWhereInput>;

    @Field(() => [tbl_class_trophyWhereInput], {nullable:true})
    NOT?: Array<tbl_class_trophyWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    classID?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    trophyID?: IntFilter;

    @Field(() => Tbl_classlistRelationFilter, {nullable:true})
    @Type(() => Tbl_classlistRelationFilter)
    tbl_classlist?: Tbl_classlistRelationFilter;

    @Field(() => Tbl_trophyRelationFilter, {nullable:true})
    tbl_trophy?: Tbl_trophyRelationFilter;
}
