import { registerEnumType } from '@nestjs/graphql';

export enum Tbl_instrumentsScalarFieldEnum {
    id = "id",
    name = "name"
}


registerEnumType(Tbl_instrumentsScalarFieldEnum, { name: 'Tbl_instrumentsScalarFieldEnum', description: undefined })
