import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class tbl_sacredWhereInput {

    @Field(() => [tbl_sacredWhereInput], {nullable:true})
    AND?: Array<tbl_sacredWhereInput>;

    @Field(() => [tbl_sacredWhereInput], {nullable:true})
    OR?: Array<tbl_sacredWhereInput>;

    @Field(() => [tbl_sacredWhereInput], {nullable:true})
    NOT?: Array<tbl_sacredWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    composer?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    largeWork?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    title?: StringFilter;
}
