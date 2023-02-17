import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_schoolWhereUniqueInput } from '../tbl-reg-school/tbl-reg-school-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniquetblRegSchoolOrThrowArgs {

    @Field(() => tbl_reg_schoolWhereUniqueInput, {nullable:false})
    @Type(() => tbl_reg_schoolWhereUniqueInput)
    where!: tbl_reg_schoolWhereUniqueInput;
}
