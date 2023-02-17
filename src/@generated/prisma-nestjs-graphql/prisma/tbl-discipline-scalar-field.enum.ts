import { registerEnumType } from '@nestjs/graphql';

export enum Tbl_disciplineScalarFieldEnum {
    id = "id",
    name = "name"
}


registerEnumType(Tbl_disciplineScalarFieldEnum, { name: 'Tbl_disciplineScalarFieldEnum', description: undefined })
