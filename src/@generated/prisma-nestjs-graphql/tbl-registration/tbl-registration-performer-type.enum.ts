import { registerEnumType } from '@nestjs/graphql';

export enum tbl_registration_performerType {
    SOLO = "SOLO",
    GROUP = "GROUP",
    SCHOOL = "SCHOOL",
    COMMUNITY = "COMMUNITY"
}


registerEnumType(tbl_registration_performerType, { name: 'tbl_registration_performerType', description: undefined })
