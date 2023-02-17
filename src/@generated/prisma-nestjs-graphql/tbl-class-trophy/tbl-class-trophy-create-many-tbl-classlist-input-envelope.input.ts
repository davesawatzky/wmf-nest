import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_class_trophyCreateManyTbl_classlistInput } from './tbl-class-trophy-create-many-tbl-classlist.input';
import { Type } from 'class-transformer';

@InputType()
export class tbl_class_trophyCreateManyTbl_classlistInputEnvelope {

    @Field(() => [tbl_class_trophyCreateManyTbl_classlistInput], {nullable:false})
    @Type(() => tbl_class_trophyCreateManyTbl_classlistInput)
    data!: Array<tbl_class_trophyCreateManyTbl_classlistInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
