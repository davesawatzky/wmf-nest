import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_disciplineWhereUniqueInput } from '../tbl-discipline/tbl-discipline-where-unique.input';
import { Type } from 'class-transformer';
import { tbl_disciplineCreateInput } from '../tbl-discipline/tbl-discipline-create.input';
import { tbl_disciplineUpdateInput } from '../tbl-discipline/tbl-discipline-update.input';

@ArgsType()
export class UpsertOnetblDisciplineArgs {

    @Field(() => tbl_disciplineWhereUniqueInput, {nullable:false})
    @Type(() => tbl_disciplineWhereUniqueInput)
    where!: tbl_disciplineWhereUniqueInput;

    @Field(() => tbl_disciplineCreateInput, {nullable:false})
    @Type(() => tbl_disciplineCreateInput)
    create!: tbl_disciplineCreateInput;

    @Field(() => tbl_disciplineUpdateInput, {nullable:false})
    @Type(() => tbl_disciplineUpdateInput)
    update!: tbl_disciplineUpdateInput;
}
