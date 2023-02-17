import { registerEnumType } from '@nestjs/graphql';

export enum Tbl_reg_unavailableScalarFieldEnum {
    id = "id",
    groupID = "groupID",
    date = "date",
    time = "time",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(Tbl_reg_unavailableScalarFieldEnum, { name: 'Tbl_reg_unavailableScalarFieldEnum', description: undefined })
