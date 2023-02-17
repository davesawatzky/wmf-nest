import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_class_trophyClassIDTrophyIDCompoundUniqueInput } from './tbl-class-trophy-class-id-trophy-id-compound-unique.input';

@InputType()
export class tbl_class_trophyWhereUniqueInput {

    @Field(() => tbl_class_trophyClassIDTrophyIDCompoundUniqueInput, {nullable:true})
    classID_trophyID?: tbl_class_trophyClassIDTrophyIDCompoundUniqueInput;
}
