import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_subdisciplineCreateManyTbl_disciplineInput } from './tbl-subdiscipline-create-many-tbl-discipline.input';
import { Type } from 'class-transformer';

@InputType()
export class tbl_subdisciplineCreateManyTbl_disciplineInputEnvelope {

    @Field(() => [tbl_subdisciplineCreateManyTbl_disciplineInput], {nullable:false})
    @Type(() => tbl_subdisciplineCreateManyTbl_disciplineInput)
    data!: Array<tbl_subdisciplineCreateManyTbl_disciplineInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
