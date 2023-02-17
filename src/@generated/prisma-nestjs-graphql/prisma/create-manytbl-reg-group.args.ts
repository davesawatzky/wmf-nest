import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_groupCreateManyInput } from '../tbl-reg-group/tbl-reg-group-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManytblRegGroupArgs {

    @Field(() => [tbl_reg_groupCreateManyInput], {nullable:false})
    @Type(() => tbl_reg_groupCreateManyInput)
    data!: Array<tbl_reg_groupCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
