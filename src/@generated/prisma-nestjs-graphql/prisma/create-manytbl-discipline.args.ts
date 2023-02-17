import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_disciplineCreateManyInput } from '../tbl-discipline/tbl-discipline-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManytblDisciplineArgs {

    @Field(() => [tbl_disciplineCreateManyInput], {nullable:false})
    @Type(() => tbl_disciplineCreateManyInput)
    data!: Array<tbl_disciplineCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
