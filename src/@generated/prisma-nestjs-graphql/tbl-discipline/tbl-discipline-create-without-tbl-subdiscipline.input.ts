import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class tbl_disciplineCreateWithoutTbl_subdisciplineInput {

    @Field(() => String, {nullable:false})
    name!: string;
}
