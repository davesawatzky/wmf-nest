import { registerEnumType } from '@nestjs/graphql';

export enum Tbl_reg_groupScalarFieldEnum {
    id = "id",
    regID = "regID",
    name = "name",
    groupType = "groupType",
    numberOfPerformers = "numberOfPerformers",
    age = "age",
    instruments = "instruments",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(Tbl_reg_groupScalarFieldEnum, { name: 'Tbl_reg_groupScalarFieldEnum', description: undefined })
