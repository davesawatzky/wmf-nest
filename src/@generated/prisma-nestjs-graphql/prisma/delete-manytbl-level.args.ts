import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_levelWhereInput } from '../tbl-level/tbl-level-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManytblLevelArgs {

    @Field(() => tbl_levelWhereInput, {nullable:true})
    @Type(() => tbl_levelWhereInput)
    where?: tbl_levelWhereInput;
}
