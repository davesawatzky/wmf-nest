import { registerEnumType } from '@nestjs/graphql';

export enum Tbl_reg_schoolScalarFieldEnum {
    id = "id",
    regID = "regID",
    name = "name",
    division = "division",
    streetNumber = "streetNumber",
    streetName = "streetName",
    city = "city",
    province = "province",
    postalCode = "postalCode",
    phone = "phone",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(Tbl_reg_schoolScalarFieldEnum, { name: 'Tbl_reg_schoolScalarFieldEnum', description: undefined })
