import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_trophyCreateManyInput } from '../tbl-trophy/tbl-trophy-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManytblTrophyArgs {

    @Field(() => [tbl_trophyCreateManyInput], {nullable:false})
    @Type(() => tbl_trophyCreateManyInput)
    data!: Array<tbl_trophyCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
