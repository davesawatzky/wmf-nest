import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_trophyUpdateManyMutationInput } from '../tbl-trophy/tbl-trophy-update-many-mutation.input';
import { Type } from 'class-transformer';
import { tbl_trophyWhereInput } from '../tbl-trophy/tbl-trophy-where.input';

@ArgsType()
export class UpdateManytblTrophyArgs {

    @Field(() => tbl_trophyUpdateManyMutationInput, {nullable:false})
    @Type(() => tbl_trophyUpdateManyMutationInput)
    data!: tbl_trophyUpdateManyMutationInput;

    @Field(() => tbl_trophyWhereInput, {nullable:true})
    @Type(() => tbl_trophyWhereInput)
    where?: tbl_trophyWhereInput;
}
