import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_subdisciplineWhereUniqueInput } from '../tbl-subdiscipline/tbl-subdiscipline-where-unique.input';
import { Type } from 'class-transformer';
import { tbl_subdisciplineCreateInput } from '../tbl-subdiscipline/tbl-subdiscipline-create.input';
import { tbl_subdisciplineUpdateInput } from '../tbl-subdiscipline/tbl-subdiscipline-update.input';

@ArgsType()
export class UpsertOnetblSubdisciplineArgs {

    @Field(() => tbl_subdisciplineWhereUniqueInput, {nullable:false})
    @Type(() => tbl_subdisciplineWhereUniqueInput)
    where!: tbl_subdisciplineWhereUniqueInput;

    @Field(() => tbl_subdisciplineCreateInput, {nullable:false})
    @Type(() => tbl_subdisciplineCreateInput)
    create!: tbl_subdisciplineCreateInput;

    @Field(() => tbl_subdisciplineUpdateInput, {nullable:false})
    @Type(() => tbl_subdisciplineUpdateInput)
    update!: tbl_subdisciplineUpdateInput;
}
