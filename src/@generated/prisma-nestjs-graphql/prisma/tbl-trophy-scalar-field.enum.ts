import { registerEnumType } from '@nestjs/graphql';

export enum Tbl_trophyScalarFieldEnum {
    id = "id",
    name = "name",
    description = "description"
}


registerEnumType(Tbl_trophyScalarFieldEnum, { name: 'Tbl_trophyScalarFieldEnum', description: undefined })
