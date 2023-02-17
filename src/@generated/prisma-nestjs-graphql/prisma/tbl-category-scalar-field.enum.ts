import { registerEnumType } from '@nestjs/graphql';

export enum Tbl_categoryScalarFieldEnum {
    id = "id",
    name = "name",
    description = "description",
    requiredComposer = "requiredComposer"
}


registerEnumType(Tbl_categoryScalarFieldEnum, { name: 'Tbl_categoryScalarFieldEnum', description: undefined })
