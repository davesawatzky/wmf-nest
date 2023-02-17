import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_levelCreateManyInput } from '../tbl-level/tbl-level-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManytblLevelArgs {

    @Field(() => [tbl_levelCreateManyInput], {nullable:false})
    @Type(() => tbl_levelCreateManyInput)
    data!: Array<tbl_levelCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
