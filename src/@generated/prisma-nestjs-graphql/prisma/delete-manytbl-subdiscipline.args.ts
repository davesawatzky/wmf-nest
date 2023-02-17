import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_subdisciplineWhereInput } from '../tbl-subdiscipline/tbl-subdiscipline-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManytblSubdisciplineArgs {

    @Field(() => tbl_subdisciplineWhereInput, {nullable:true})
    @Type(() => tbl_subdisciplineWhereInput)
    where?: tbl_subdisciplineWhereInput;
}
