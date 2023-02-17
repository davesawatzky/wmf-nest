import { registerEnumType } from '@nestjs/graphql';

export enum Tbl_classlistScalarFieldEnum {
    id = "id",
    classNumber = "classNumber",
    subdisciplineID = "subdisciplineID",
    categoryID = "categoryID",
    levelID = "levelID",
    minSelection = "minSelection",
    maxSelection = "maxSelection",
    requiredSelection = "requiredSelection",
    SGSlabel = "SGSlabel",
    price = "price"
}


registerEnumType(Tbl_classlistScalarFieldEnum, { name: 'Tbl_classlistScalarFieldEnum', description: undefined })
