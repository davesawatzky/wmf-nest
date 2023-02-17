import { registerEnumType } from '@nestjs/graphql';

export enum Tbl_reg_communityScalarFieldEnum {
    id = "id",
    regID = "regID",
    name = "name",
    groupSize = "groupSize",
    chaperones = "chaperones",
    wheelchairs = "wheelchairs",
    earliestTime = "earliestTime",
    latestTime = "latestTime",
    unavailable = "unavailable",
    conflictPerformers = "conflictPerformers",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(Tbl_reg_communityScalarFieldEnum, { name: 'Tbl_reg_communityScalarFieldEnum', description: undefined })
