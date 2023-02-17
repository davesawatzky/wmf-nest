import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_class_trophyCreateInput } from '../tbl-class-trophy/tbl-class-trophy-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOnetblClassTrophyArgs {

    @Field(() => tbl_class_trophyCreateInput, {nullable:false})
    @Type(() => tbl_class_trophyCreateInput)
    data!: tbl_class_trophyCreateInput;
}
