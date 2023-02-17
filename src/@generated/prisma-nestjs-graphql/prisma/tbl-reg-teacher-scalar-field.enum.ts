import { registerEnumType } from '@nestjs/graphql';

export enum Tbl_reg_teacherScalarFieldEnum {
    id = "id",
    regID = "regID",
    prefix = "prefix",
    lastName = "lastName",
    firstName = "firstName",
    apartment = "apartment",
    streetNumber = "streetNumber",
    streetName = "streetName",
    city = "city",
    province = "province",
    postalCode = "postalCode",
    phone = "phone",
    email = "email",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(Tbl_reg_teacherScalarFieldEnum, { name: 'Tbl_reg_teacherScalarFieldEnum', description: undefined })
