import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_subdisciplineUpdateManyMutationInput } from '../tbl-subdiscipline/tbl-subdiscipline-update-many-mutation.input';
import { Type } from 'class-transformer';
import { tbl_subdisciplineWhereInput } from '../tbl-subdiscipline/tbl-subdiscipline-where.input';

@ArgsType()
export class UpdateManytblSubdisciplineArgs {

    @Field(() => tbl_subdisciplineUpdateManyMutationInput, {nullable:false})
    @Type(() => tbl_subdisciplineUpdateManyMutationInput)
    data!: tbl_subdisciplineUpdateManyMutationInput;

    @Field(() => tbl_subdisciplineWhereInput, {nullable:true})
    @Type(() => tbl_subdisciplineWhereInput)
    where?: tbl_subdisciplineWhereInput;
}
