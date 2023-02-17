import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_class_trophyCreateManyTbl_trophyInput } from './tbl-class-trophy-create-many-tbl-trophy.input';
import { Type } from 'class-transformer';

@InputType()
export class tbl_class_trophyCreateManyTbl_trophyInputEnvelope {

    @Field(() => [tbl_class_trophyCreateManyTbl_trophyInput], {nullable:false})
    @Type(() => tbl_class_trophyCreateManyTbl_trophyInput)
    data!: Array<tbl_class_trophyCreateManyTbl_trophyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
