import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_sacredCreateManyInput } from '../tbl-sacred/tbl-sacred-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManytblSacredArgs {

    @Field(() => [tbl_sacredCreateManyInput], {nullable:false})
    @Type(() => tbl_sacredCreateManyInput)
    data!: Array<tbl_sacredCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
