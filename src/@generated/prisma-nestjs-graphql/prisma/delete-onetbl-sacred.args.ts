import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_sacredWhereUniqueInput } from '../tbl-sacred/tbl-sacred-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOnetblSacredArgs {

    @Field(() => tbl_sacredWhereUniqueInput, {nullable:false})
    @Type(() => tbl_sacredWhereUniqueInput)
    where!: tbl_sacredWhereUniqueInput;
}
