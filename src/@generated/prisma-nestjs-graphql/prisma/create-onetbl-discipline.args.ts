import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_disciplineCreateInput } from '../tbl-discipline/tbl-discipline-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOnetblDisciplineArgs {

    @Field(() => tbl_disciplineCreateInput, {nullable:false})
    @Type(() => tbl_disciplineCreateInput)
    data!: tbl_disciplineCreateInput;
}
