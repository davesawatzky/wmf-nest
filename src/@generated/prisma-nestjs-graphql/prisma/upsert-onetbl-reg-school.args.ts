import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_schoolWhereUniqueInput } from '../tbl-reg-school/tbl-reg-school-where-unique.input';
import { Type } from 'class-transformer';
import { tbl_reg_schoolCreateInput } from '../tbl-reg-school/tbl-reg-school-create.input';
import { tbl_reg_schoolUpdateInput } from '../tbl-reg-school/tbl-reg-school-update.input';

@ArgsType()
export class UpsertOnetblRegSchoolArgs {

    @Field(() => tbl_reg_schoolWhereUniqueInput, {nullable:false})
    @Type(() => tbl_reg_schoolWhereUniqueInput)
    where!: tbl_reg_schoolWhereUniqueInput;

    @Field(() => tbl_reg_schoolCreateInput, {nullable:false})
    @Type(() => tbl_reg_schoolCreateInput)
    create!: tbl_reg_schoolCreateInput;

    @Field(() => tbl_reg_schoolUpdateInput, {nullable:false})
    @Type(() => tbl_reg_schoolUpdateInput)
    update!: tbl_reg_schoolUpdateInput;
}
