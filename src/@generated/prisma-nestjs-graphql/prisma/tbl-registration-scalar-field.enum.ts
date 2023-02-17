import { registerEnumType } from '@nestjs/graphql';

export enum Tbl_registrationScalarFieldEnum {
    id = "id",
    userID = "userID",
    label = "label",
    performerType = "performerType",
    submittedAt = "submittedAt",
    totalAmt = "totalAmt",
    payedAmt = "payedAmt",
    transactionInfo = "transactionInfo",
    confirmation = "confirmation",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(Tbl_registrationScalarFieldEnum, { name: 'Tbl_registrationScalarFieldEnum', description: undefined })
