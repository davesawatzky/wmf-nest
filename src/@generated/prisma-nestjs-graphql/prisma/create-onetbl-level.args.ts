import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_levelCreateInput } from '../tbl-level/tbl-level-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOnetblLevelArgs {

    @Field(() => tbl_levelCreateInput, {nullable:false})
    @Type(() => tbl_levelCreateInput)
    data!: tbl_levelCreateInput;
}
