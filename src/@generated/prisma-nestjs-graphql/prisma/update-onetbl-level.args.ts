import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_levelUpdateInput } from '../tbl-level/tbl-level-update.input';
import { Type } from 'class-transformer';
import { tbl_levelWhereUniqueInput } from '../tbl-level/tbl-level-where-unique.input';

@ArgsType()
export class UpdateOnetblLevelArgs {

    @Field(() => tbl_levelUpdateInput, {nullable:false})
    @Type(() => tbl_levelUpdateInput)
    data!: tbl_levelUpdateInput;

    @Field(() => tbl_levelWhereUniqueInput, {nullable:false})
    @Type(() => tbl_levelWhereUniqueInput)
    where!: tbl_levelWhereUniqueInput;
}
