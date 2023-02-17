import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_trophyCreateInput } from '../tbl-trophy/tbl-trophy-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOnetblTrophyArgs {

    @Field(() => tbl_trophyCreateInput, {nullable:false})
    @Type(() => tbl_trophyCreateInput)
    data!: tbl_trophyCreateInput;
}
