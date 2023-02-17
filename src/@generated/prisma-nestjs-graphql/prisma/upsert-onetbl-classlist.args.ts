import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_classlistWhereUniqueInput } from '../tbl-classlist/tbl-classlist-where-unique.input';
import { Type } from 'class-transformer';
import { tbl_classlistCreateInput } from '../tbl-classlist/tbl-classlist-create.input';
import { tbl_classlistUpdateInput } from '../tbl-classlist/tbl-classlist-update.input';

@ArgsType()
export class UpsertOnetblClasslistArgs {

    @Field(() => tbl_classlistWhereUniqueInput, {nullable:false})
    @Type(() => tbl_classlistWhereUniqueInput)
    where!: tbl_classlistWhereUniqueInput;

    @Field(() => tbl_classlistCreateInput, {nullable:false})
    @Type(() => tbl_classlistCreateInput)
    create!: tbl_classlistCreateInput;

    @Field(() => tbl_classlistUpdateInput, {nullable:false})
    @Type(() => tbl_classlistUpdateInput)
    update!: tbl_classlistUpdateInput;
}
