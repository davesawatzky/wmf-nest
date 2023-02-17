import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_schoolCreateManyInput } from '../tbl-reg-school/tbl-reg-school-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManytblRegSchoolArgs {

    @Field(() => [tbl_reg_schoolCreateManyInput], {nullable:false})
    @Type(() => tbl_reg_schoolCreateManyInput)
    data!: Array<tbl_reg_schoolCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
