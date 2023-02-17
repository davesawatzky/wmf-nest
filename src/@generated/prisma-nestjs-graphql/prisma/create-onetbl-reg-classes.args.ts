import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_classesCreateInput } from '../tbl-reg-classes/tbl-reg-classes-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOnetblRegClassesArgs {

    @Field(() => tbl_reg_classesCreateInput, {nullable:false})
    @Type(() => tbl_reg_classesCreateInput)
    data!: tbl_reg_classesCreateInput;
}
