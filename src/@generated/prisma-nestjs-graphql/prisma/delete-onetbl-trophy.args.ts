import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_trophyWhereUniqueInput } from '../tbl-trophy/tbl-trophy-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOnetblTrophyArgs {

    @Field(() => tbl_trophyWhereUniqueInput, {nullable:false})
    @Type(() => tbl_trophyWhereUniqueInput)
    where!: tbl_trophyWhereUniqueInput;
}
