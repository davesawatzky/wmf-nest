import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_class_trophyWhereInput } from '../tbl-class-trophy/tbl-class-trophy-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManytblClassTrophyArgs {

    @Field(() => tbl_class_trophyWhereInput, {nullable:true})
    @Type(() => tbl_class_trophyWhereInput)
    where?: tbl_class_trophyWhereInput;
}
