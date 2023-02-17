import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class Tbl_disciplineCount {

    @Field(() => Int, {nullable:false})
    tbl_subdiscipline!: number;
}
