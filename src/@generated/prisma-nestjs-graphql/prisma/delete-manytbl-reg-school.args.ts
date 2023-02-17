import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_schoolWhereInput } from '../tbl-reg-school/tbl-reg-school-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManytblRegSchoolArgs {

    @Field(() => tbl_reg_schoolWhereInput, {nullable:true})
    @Type(() => tbl_reg_schoolWhereInput)
    where?: tbl_reg_schoolWhereInput;
}
