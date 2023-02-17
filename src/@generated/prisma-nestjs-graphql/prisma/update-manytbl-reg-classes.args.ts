import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_classesUpdateManyMutationInput } from '../tbl-reg-classes/tbl-reg-classes-update-many-mutation.input';
import { Type } from 'class-transformer';
import { tbl_reg_classesWhereInput } from '../tbl-reg-classes/tbl-reg-classes-where.input';

@ArgsType()
export class UpdateManytblRegClassesArgs {

    @Field(() => tbl_reg_classesUpdateManyMutationInput, {nullable:false})
    @Type(() => tbl_reg_classesUpdateManyMutationInput)
    data!: tbl_reg_classesUpdateManyMutationInput;

    @Field(() => tbl_reg_classesWhereInput, {nullable:true})
    @Type(() => tbl_reg_classesWhereInput)
    where?: tbl_reg_classesWhereInput;
}
