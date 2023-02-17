import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_classlistWhereUniqueInput } from '../tbl-classlist/tbl-classlist-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniquetblClasslistArgs {

    @Field(() => tbl_classlistWhereUniqueInput, {nullable:false})
    @Type(() => tbl_classlistWhereUniqueInput)
    where!: tbl_classlistWhereUniqueInput;
}
