import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_sacredWhereInput } from '../tbl-sacred/tbl-sacred-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManytblSacredArgs {

    @Field(() => tbl_sacredWhereInput, {nullable:true})
    @Type(() => tbl_sacredWhereInput)
    where?: tbl_sacredWhereInput;
}
