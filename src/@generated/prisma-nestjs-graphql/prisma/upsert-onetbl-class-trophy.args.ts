import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_class_trophyWhereUniqueInput } from '../tbl-class-trophy/tbl-class-trophy-where-unique.input';
import { Type } from 'class-transformer';
import { tbl_class_trophyCreateInput } from '../tbl-class-trophy/tbl-class-trophy-create.input';
import { tbl_class_trophyUpdateInput } from '../tbl-class-trophy/tbl-class-trophy-update.input';

@ArgsType()
export class UpsertOnetblClassTrophyArgs {

    @Field(() => tbl_class_trophyWhereUniqueInput, {nullable:false})
    @Type(() => tbl_class_trophyWhereUniqueInput)
    where!: tbl_class_trophyWhereUniqueInput;

    @Field(() => tbl_class_trophyCreateInput, {nullable:false})
    @Type(() => tbl_class_trophyCreateInput)
    create!: tbl_class_trophyCreateInput;

    @Field(() => tbl_class_trophyUpdateInput, {nullable:false})
    @Type(() => tbl_class_trophyUpdateInput)
    update!: tbl_class_trophyUpdateInput;
}
