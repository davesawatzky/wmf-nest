import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_levelWhereUniqueInput } from '../tbl-level/tbl-level-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniquetblLevelOrThrowArgs {

    @Field(() => tbl_levelWhereUniqueInput, {nullable:false})
    @Type(() => tbl_levelWhereUniqueInput)
    where!: tbl_levelWhereUniqueInput;
}
