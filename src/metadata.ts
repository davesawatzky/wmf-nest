/* eslint-disable */
export default async () => {
    const t = {
        ["./common.entity"]: await import("./common.entity"),
        ["./festival/class-type/entities/class-type.entity"]: await import("./festival/class-type/entities/class-type.entity"),
        ["./festival/discipline/entities/discipline.entity"]: await import("./festival/discipline/entities/discipline.entity"),
        ["./festival/instrument/entities/instrument.entity"]: await import("./festival/instrument/entities/instrument.entity"),
        ["./festival/subdiscipline/entities/subdiscipline.entity"]: await import("./festival/subdiscipline/entities/subdiscipline.entity"),
        ["./festival/category/entities/category.entity"]: await import("./festival/category/entities/category.entity"),
        ["./festival/level/entities/level.entity"]: await import("./festival/level/entities/level.entity"),
        ["./festival/festival-class/entities/festival-class.entity"]: await import("./festival/festival-class/entities/festival-class.entity"),
        ["./festival/trophy/entities/trophy.entity"]: await import("./festival/trophy/entities/trophy.entity"),
        ["./submissions/order/entities/order.entity"]: await import("./submissions/order/entities/order.entity"),
        ["./festival/item/entities/item.entity"]: await import("./festival/item/entities/item.entity"),
        ["./submissions/order-item/entities/order-item.entity"]: await import("./submissions/order-item/entities/order-item.entity"),
        ["./submissions/community/entities/community.entity"]: await import("./submissions/community/entities/community.entity"),
        ["./submissions/community-group/entities/community-group.entity"]: await import("./submissions/community-group/entities/community-group.entity"),
        ["./submissions/registration/entities/registration.entity"]: await import("./submissions/registration/entities/registration.entity"),
        ["./submissions/group/entities/group.entity"]: await import("./submissions/group/entities/group.entity"),
        ["./submissions/performer/entities/performer.entity"]: await import("./submissions/performer/entities/performer.entity"),
        ["./submissions/selection/entities/selection.entity"]: await import("./submissions/selection/entities/selection.entity"),
        ["./submissions/registered-class/entities/registered-class.entity"]: await import("./submissions/registered-class/entities/registered-class.entity"),
        ["./submissions/school/entities/school.entity"]: await import("./submissions/school/entities/school.entity"),
        ["./submissions/school-group/entities/school-group.entity"]: await import("./submissions/school-group/entities/school-group.entity"),
        ["./user/entities/user.entity"]: await import("./user/entities/user.entity"),
        ["./submissions/field-config/entities/field-config.entity"]: await import("./submissions/field-config/entities/field-config.entity"),
        ["./submissions/teacher/entities/teacher.entity"]: await import("./submissions/teacher/entities/teacher.entity"),
        ["./submissions/submission/entities/submission.entity"]: await import("./submissions/submission/entities/submission.entity")
    };
    return { "@nestjs/graphql": { "models": [[import("./common.entity"), { "UserError": { message: { type: () => String }, field: { type: () => [String] } } }], [import("./festival/class-type/entities/class-type.entity"), { "ClassType": { name: { type: () => String }, description: { nullable: true, type: () => String }, id: {} }, "ClassTypePayload": { userErrors: { type: () => [t["./common.entity"].UserError] }, classType: { nullable: true, type: () => t["./festival/class-type/entities/class-type.entity"].ClassType } } }], [import("./festival/instrument/entities/instrument.entity"), { "Instrument": { name: { type: () => String }, mozart: { nullable: true, type: () => Boolean }, discipline: { nullable: true, type: () => t["./festival/discipline/entities/discipline.entity"].Discipline }, id: {} }, "InstrumentPayload": { userErrors: { type: () => [t["./common.entity"].UserError] }, instrument: { nullable: true, type: () => t["./festival/instrument/entities/instrument.entity"].Instrument } } }], [import("./festival/discipline/entities/discipline.entity"), { "Discipline": { name: { type: () => String }, instruments: { nullable: true, type: () => [t["./festival/instrument/entities/instrument.entity"].Instrument] }, subdisciplines: { nullable: true, type: () => [t["./festival/subdiscipline/entities/subdiscipline.entity"].Subdiscipline] }, id: {} }, "DisciplinePayload": { userErrors: { type: () => [t["./common.entity"].UserError] }, discipline: { nullable: true, type: () => t["./festival/discipline/entities/discipline.entity"].Discipline } } }], [import("./festival/subdiscipline/entities/subdiscipline.entity"), { "Subdiscipline": { name: { type: () => String }, description: { nullable: true, type: () => String }, performerType: { nullable: true, type: () => t["./common.entity"].PerformerType }, categories: { nullable: true, type: () => [t["./festival/category/entities/category.entity"].Category] }, levels: { nullable: true, type: () => [t["./festival/level/entities/level.entity"].Level] }, discipline: { nullable: true, type: () => t["./festival/discipline/entities/discipline.entity"].Discipline }, festivalClasses: { nullable: true, type: () => [t["./festival/festival-class/entities/festival-class.entity"].FestivalClass] }, id: {}, maxPerformers: { nullable: true }, minPerformers: { nullable: true }, price: { nullable: true } }, "SubdisciplinePayload": { userErrors: { type: () => [t["./common.entity"].UserError] }, subdiscipline: { nullable: true, type: () => t["./festival/subdiscipline/entities/subdiscipline.entity"].Subdiscipline } } }], [import("./festival/level/entities/level.entity"), { "Level": { name: { type: () => String }, description: { nullable: true, type: () => String }, categories: { nullable: true, type: () => [t["./festival/category/entities/category.entity"].Category] }, subdisciplines: { nullable: true, type: () => [t["./festival/subdiscipline/entities/subdiscipline.entity"].Subdiscipline] }, festivalClasses: { nullable: true, type: () => [t["./festival/festival-class/entities/festival-class.entity"].FestivalClass] }, id: {} }, "LevelPayload": { userErrors: { type: () => [t["./common.entity"].UserError] }, level: { nullable: true, type: () => t["./festival/level/entities/level.entity"].Level } } }], [import("./festival/trophy/entities/trophy.entity"), { "Trophy": { name: { type: () => String }, description: { nullable: true, type: () => String }, festivalClasses: { nullable: true, type: () => [t["./festival/festival-class/entities/festival-class.entity"].FestivalClass] }, id: {} }, "TrophyPayload": { userErrors: { type: () => [t["./common.entity"].UserError] }, trophy: { nullable: true, type: () => t["./festival/trophy/entities/trophy.entity"].Trophy } } }], [import("./festival/festival-class/entities/festival-class.entity"), { "FestivalClass": { classNumber: { type: () => String }, classType: { type: () => t["./festival/class-type/entities/class-type.entity"].ClassType }, subdiscipline: { type: () => t["./festival/subdiscipline/entities/subdiscipline.entity"].Subdiscipline }, level: { type: () => t["./festival/level/entities/level.entity"].Level }, category: { type: () => t["./festival/category/entities/category.entity"].Category }, requiredSelection: { nullable: true, type: () => String }, performerType: { type: () => t["./common.entity"].PerformerType }, price: { nullable: true, type: () => Number }, description: { nullable: true, type: () => String }, trophies: { nullable: true, type: () => [t["./festival/trophy/entities/trophy.entity"].Trophy] }, id: {}, maxSelections: {}, minSelections: {} }, "FestivalClassPayload": { userErrors: { type: () => [t["./common.entity"].UserError] }, festivalClass: { nullable: true, type: () => t["./festival/festival-class/entities/festival-class.entity"].FestivalClass } } }], [import("./festival/category/entities/category.entity"), { "Category": { name: { type: () => String }, description: { nullable: true, type: () => String }, requiredComposer: { nullable: true, type: () => String }, levels: { nullable: true, type: () => [t["./festival/level/entities/level.entity"].Level] }, subdisciplines: { nullable: true, type: () => [t["./festival/subdiscipline/entities/subdiscipline.entity"].Subdiscipline] }, festivalClasses: { nullable: true, type: () => [t["./festival/festival-class/entities/festival-class.entity"].FestivalClass] }, id: {} }, "CategoryPayload": { userErrors: { type: () => [t["./common.entity"].UserError] }, category: { nullable: true, type: () => t["./festival/category/entities/category.entity"].Category } } }], [import("./submissions/order-item/entities/order-item.entity"), { "OrderItem": { notes: { nullable: true, type: () => String }, updatedAt: { nullable: true, type: () => Date }, createdAt: { nullable: true, type: () => Date }, order: { nullable: true, type: () => t["./submissions/order/entities/order.entity"].Order }, item: { nullable: true, type: () => t["./festival/item/entities/item.entity"].Item }, orderID: {}, itemID: {}, namesOnItems: {}, quantity: {} }, "OrderItemPayload": { userErrors: { type: () => [t["./common.entity"].UserError] }, orderItem: { nullable: true, type: () => t["./submissions/order-item/entities/order-item.entity"].OrderItem } } }], [import("./submissions/community-group/entities/community-group.entity"), { "CommunityGroup": { name: { nullable: true, type: () => String }, conflictPerformers: { nullable: true, type: () => String }, earliestTime: { nullable: true, type: () => String }, latestTime: { nullable: true, type: () => String }, unavailable: { nullable: true, type: () => String }, photoPermission: { nullable: true, type: () => Boolean }, community: { nullable: true, type: () => t["./submissions/community/entities/community.entity"].Community }, id: {}, groupSize: { nullable: true }, chaperones: { nullable: true }, wheelchairs: { nullable: true } }, "CommunityGroupPayload": { userErrors: { type: () => [t["./common.entity"].UserError] }, communityGroup: { nullable: true, type: () => t["./submissions/community-group/entities/community-group.entity"].CommunityGroup } } }], [import("./submissions/community/entities/community.entity"), { "Community": { name: { nullable: true, type: () => String }, address: { nullable: true, type: () => String }, city: { nullable: true, type: () => String }, province: { nullable: true, type: () => String }, postalCode: { nullable: true, type: () => String }, phone: { nullable: true, type: () => String }, email: { nullable: true, type: () => String }, communityGroups: { nullable: true, type: () => [t["./submissions/community-group/entities/community-group.entity"].CommunityGroup] }, registration: { nullable: true, type: () => t["./submissions/registration/entities/registration.entity"].Registration }, id: {} }, "CommunityPayload": { userErrors: { type: () => [t["./common.entity"].UserError] }, community: { nullable: true, type: () => t["./submissions/community/entities/community.entity"].Community } } }], [import("./submissions/group/entities/group.entity"), { "Group": { name: { nullable: true, type: () => String }, groupType: { nullable: true, type: () => String }, instruments: { nullable: true, type: () => String }, registration: { nullable: true, type: () => t["./submissions/registration/entities/registration.entity"].Registration }, id: {}, numberOfPerformers: { nullable: true }, age: { nullable: true } }, "GroupPayload": { userErrors: { type: () => [t["./common.entity"].UserError] }, group: { nullable: true, type: () => t["./submissions/group/entities/group.entity"].Group } } }], [import("./submissions/performer/entities/performer.entity"), { "Performer": { pronouns: { nullable: true, type: () => String }, firstName: { nullable: true, type: () => String }, lastName: { nullable: true, type: () => String }, address: { nullable: true, type: () => String }, city: { nullable: true, type: () => String }, province: { nullable: true, type: () => String }, postalCode: { nullable: true, type: () => String }, phone: { nullable: true, type: () => String }, email: { nullable: true, type: () => String }, otherClasses: { nullable: true, type: () => String }, instrument: { nullable: true, type: () => String }, level: { nullable: true, type: () => String }, unavailable: { nullable: true, type: () => String }, photoPermission: { nullable: true, type: () => Boolean }, registration: { nullable: true, type: () => t["./submissions/registration/entities/registration.entity"].Registration }, id: {}, age: { nullable: true } }, "PerformerPayload": { userErrors: { type: () => [t["./common.entity"].UserError] }, performer: { nullable: true, type: () => t["./submissions/performer/entities/performer.entity"].Performer } } }], [import("./submissions/selection/entities/selection.entity"), { "Selection": { title: { nullable: true, type: () => String }, largerWork: { nullable: true, type: () => String }, movement: { nullable: true, type: () => String }, composer: { nullable: true, type: () => String }, duration: { nullable: true, type: () => String }, id: {} }, "SelectionPayload": { userErrors: { type: () => [t["./common.entity"].UserError] }, selection: { type: () => t["./submissions/selection/entities/selection.entity"].Selection } } }], [import("./submissions/registered-class/entities/registered-class.entity"), { "RegisteredClass": { selections: { nullable: true, type: () => [t["./submissions/selection/entities/selection.entity"].Selection] }, classType: { nullable: true, type: () => String }, classNumber: { nullable: true, type: () => String }, discipline: { nullable: true, type: () => String }, subdiscipline: { nullable: true, type: () => String }, level: { nullable: true, type: () => String }, category: { nullable: true, type: () => String }, id: {}, numberOfSelections: { nullable: true }, minSelections: { nullable: true }, maxSelections: { nullable: true }, price: { nullable: true }, schoolGroupID: { nullable: true }, communityGroupID: { nullable: true } }, "RegisteredClassPayload": { userErrors: { type: () => [t["./common.entity"].UserError] }, registeredClass: { type: () => t["./submissions/registered-class/entities/registered-class.entity"].RegisteredClass } } }], [import("./submissions/school-group/entities/school-group.entity"), { "SchoolGroup": { name: { nullable: true, type: () => String }, conflictPerformers: { nullable: true, type: () => String }, earliestTime: { nullable: true, type: () => String }, latestTime: { nullable: true, type: () => String }, unavailable: { nullable: true, type: () => String }, photoPermission: { nullable: true, type: () => Boolean }, school: { nullable: true, type: () => t["./submissions/school/entities/school.entity"].School }, id: {}, groupSize: { nullable: true }, chaperones: { nullable: true }, wheelchairs: { nullable: true } }, "SchoolGroupPayload": { userErrors: { type: () => [t["./common.entity"].UserError] }, schoolGroup: { nullable: true, type: () => t["./submissions/school-group/entities/school-group.entity"].SchoolGroup } } }], [import("./submissions/school/entities/school.entity"), { "School": { name: { nullable: true, type: () => String }, division: { nullable: true, type: () => String }, address: { nullable: true, type: () => String }, city: { nullable: true, type: () => String }, province: { nullable: true, type: () => String }, postalCode: { nullable: true, type: () => String }, phone: { nullable: true, type: () => String }, schoolGroups: { nullable: true, type: () => [t["./submissions/school-group/entities/school-group.entity"].SchoolGroup] }, registration: { nullable: true, type: () => t["./submissions/registration/entities/registration.entity"].Registration }, id: {} }, "SchoolPayload": { userErrors: { type: () => [t["./common.entity"].UserError] }, school: { nullable: true, type: () => t["./submissions/school/entities/school.entity"].School } } }], [import("./submissions/registration/entities/registration.entity"), { "Registration": { label: { nullable: true, type: () => String }, user: { type: () => t["./user/entities/user.entity"].User }, performers: { nullable: true, type: () => [t["./submissions/performer/entities/performer.entity"].Performer] }, registeredClasses: { nullable: true, type: () => [t["./submissions/registered-class/entities/registered-class.entity"].RegisteredClass] }, group: { nullable: true, type: () => t["./submissions/group/entities/group.entity"].Group }, community: { nullable: true, type: () => t["./submissions/community/entities/community.entity"].Community }, teacher: { nullable: true, type: () => t["./user/entities/user.entity"].User }, school: { nullable: true, type: () => t["./submissions/school/entities/school.entity"].School }, photoPermission: { nullable: true, type: () => Boolean }, performerType: { type: () => t["./common.entity"].PerformerType }, transactionInfo: { nullable: true, type: () => String }, confirmation: { nullable: true, type: () => String }, submittedAt: { nullable: true, type: () => Date }, createdAt: { nullable: true, type: () => Date }, updatedAt: { nullable: true, type: () => Date }, id: {}, totalAmt: { nullable: true }, payedAmt: { nullable: true } }, "RegistrationPayload": { userErrors: { type: () => [t["./common.entity"].UserError] }, registration: { nullable: true, type: () => t["./submissions/registration/entities/registration.entity"].Registration } } }], [import("./user/entities/user.entity"), { "User": { email: { nullable: true, type: () => String }, emailConfirmed: { nullable: true, type: () => Boolean }, staff: { nullable: true, type: () => Boolean }, admin: { nullable: true, type: () => Boolean }, instrument: { nullable: true, type: () => String }, privateTeacher: { nullable: true, type: () => Boolean }, schoolTeacher: { nullable: true, type: () => Boolean }, hasSignedIn: { nullable: true, type: () => Boolean }, firstName: { nullable: true, type: () => String }, lastName: { nullable: true, type: () => String }, address: { nullable: true, type: () => String }, city: { nullable: true, type: () => String }, province: { nullable: true, type: () => String }, postalCode: { nullable: true, type: () => String }, phone: { nullable: true, type: () => String }, registrations: { nullable: true, type: () => [t["./submissions/registration/entities/registration.entity"].Registration] }, orders: { nullable: true, type: () => [t["./submissions/order/entities/order.entity"].Order] }, id: {} }, "UserPayload": { userErrors: { type: () => [t["./common.entity"].UserError] }, user: { nullable: true, type: () => t["./user/entities/user.entity"].User } } }], [import("./submissions/order/entities/order.entity"), { "Order": { purchaseDate: { nullable: true, type: () => Date }, deliveryDate: { nullable: true, type: () => Date }, methodDelivered: { nullable: true, type: () => String }, updatedAt: { nullable: true, type: () => Date }, createdAt: { nullable: true, type: () => Date }, user: { nullable: true, type: () => t["./user/entities/user.entity"].User }, items: { nullable: true, type: () => [t["./festival/item/entities/item.entity"].Item] }, orderItems: { nullable: true, type: () => [t["./submissions/order-item/entities/order-item.entity"].OrderItem] }, id: {}, totalAmount: { nullable: true }, payedAmount: { nullable: true } }, "OrderPayload": { userErrors: { type: () => [t["./common.entity"].UserError] }, order: { nullable: true, type: () => t["./submissions/order/entities/order.entity"].Order } } }], [import("./festival/item/entities/item.entity"), { "Item": { name: { nullable: true, type: () => String }, description: { nullable: true, type: () => String }, taxable: { nullable: true, type: () => Boolean }, transferable: { nullable: true, type: () => Boolean }, startDate: { nullable: true, type: () => Date }, endDate: { nullable: true, type: () => Date }, notes: { nullable: true, type: () => String }, updatedAt: { nullable: true, type: () => Date }, createdAt: { nullable: true, type: () => Date }, orders: { nullable: true, type: () => [t["./submissions/order/entities/order.entity"].Order] }, orderItems: { nullable: true, type: () => [t["./submissions/order-item/entities/order-item.entity"].OrderItem] }, id: {}, price: { nullable: true } }, "ItemPayload": { userErrors: { type: () => [t["./common.entity"].UserError] }, item: { nullable: true, type: () => t["./festival/item/entities/item.entity"].Item } } }], [import("./submissions/field-config/entities/field-config.entity"), { "FieldConfig": { tableName: { type: () => String }, fieldName: { type: () => String }, submissionRequired: { type: () => Boolean }, communityRequired: { type: () => Boolean }, groupRequired: { type: () => Boolean }, schoolRequired: { type: () => Boolean }, soloRequired: { type: () => Boolean }, customField: { type: () => Boolean }, customFieldType: { nullable: true, type: () => String }, id: {} }, "FieldConfigPayload": { userErrors: { type: () => [t["./common.entity"].UserError] }, fieldConfig: { type: () => t["./submissions/field-config/entities/field-config.entity"].FieldConfig } } }], [import("./submissions/teacher/entities/teacher.entity"), { "Teacher": { email: { nullable: true, type: () => String }, privateTeacher: { nullable: true, type: () => Boolean }, schoolTeacher: { nullable: true, type: () => Boolean }, instrument: { nullable: true, type: () => String }, firstName: { nullable: true, type: () => String }, lastName: { nullable: true, type: () => String }, address: { nullable: true, type: () => String }, city: { nullable: true, type: () => String }, province: { nullable: true, type: () => String }, postalCode: { nullable: true, type: () => String }, phone: { nullable: true, type: () => String }, registrations: { nullable: true, type: () => [t["./submissions/registration/entities/registration.entity"].Registration] }, id: {} }, "TeacherPayload": { userErrors: { type: () => [t["./common.entity"].UserError] }, teacher: { nullable: true, type: () => t["./submissions/teacher/entities/teacher.entity"].Teacher } } }], [import("./submissions/order-item/dto/order-item.input"), { "OrderItemInput": { notes: { nullable: true, type: () => String }, orderID: {}, itemID: {}, namesOnItems: { nullable: true }, quantity: { nullable: true } } }], [import("./festival/item/dto/item.input"), { "ItemInput": { name: { nullable: true, type: () => String }, description: { nullable: true, type: () => String }, taxable: { nullable: true, type: () => Boolean }, transferable: { nullable: true, type: () => Boolean }, startDate: { nullable: true, type: () => Date }, endDate: { nullable: true, type: () => Date }, notes: { nullable: true, type: () => String }, price: { nullable: true } } }], [import("./submissions/order/dto/order.input"), { "OrderInput": { purchaseDate: { nullable: true, type: () => Date }, deliveryDate: { nullable: true, type: () => Date }, methodDelivered: { nullable: true, type: () => String }, totalAmount: { nullable: true }, payedAmount: { nullable: true } } }], [import("./user/dto/user.input"), { "UserInput": { admin: { nullable: true, type: () => Boolean }, staff: { nullable: true, type: () => Boolean }, privateTeacher: { nullable: true, type: () => Boolean }, schoolTeacher: { nullable: true, type: () => Boolean }, hasSignedIn: { nullable: true, type: () => Boolean }, emailConfirmed: { nullable: true, type: () => Boolean }, firstName: { nullable: true, type: () => String }, lastName: { nullable: true, type: () => String }, address: { nullable: true, type: () => String }, city: { nullable: true, type: () => String }, province: { nullable: true, type: () => String }, instrument: { nullable: true, type: () => String }, postalCode: { nullable: true, type: () => String }, phone: { nullable: true, type: () => String } } }], [import("./submissions/community/dto/community.input"), { "CommunityInput": { name: { nullable: true, type: () => String }, address: { nullable: true, type: () => String }, city: { nullable: true, type: () => String }, province: { nullable: true, type: () => String }, postalCode: { nullable: true, type: () => String }, phone: { nullable: true, type: () => String }, email: { nullable: true, type: () => String } } }], [import("./submissions/community-group/dto/community-group.input"), { "CommunityGroupInput": { name: { nullable: true, type: () => String }, conflictPerformers: { nullable: true, type: () => String }, earliestTime: { nullable: true, type: () => String }, latestTime: { nullable: true, type: () => String }, unavailable: { nullable: true, type: () => String }, photoPermission: { nullable: true, type: () => Boolean }, groupSize: { nullable: true }, chaperones: { nullable: true }, wheelchairs: { nullable: true } } }], [import("./submissions/registration/dto/registration.input"), { "RegistrationInput": { confirmation: { nullable: true, type: () => String }, label: { nullable: true, type: () => String }, performerType: { nullable: true, type: () => t["./common.entity"].PerformerType }, transactionInfo: { nullable: true, type: () => String }, submittedAt: { nullable: true, type: () => Date }, payedAmt: { nullable: true }, teacherID: { nullable: true }, photoPermission: { nullable: true }, totalAmt: { nullable: true } } }], [import("./submissions/group/dto/group.input"), { "GroupInput": { name: { nullable: true, type: () => String }, groupType: { nullable: true, type: () => String }, instruments: { nullable: true, type: () => String }, numberOfPerformers: { nullable: true }, age: { nullable: true } } }], [import("./submissions/performer/dto/performer.input"), { "PerformerInput": { pronouns: { nullable: true, type: () => String }, firstName: { nullable: true, type: () => String }, lastName: { nullable: true, type: () => String }, address: { nullable: true, type: () => String }, city: { nullable: true, type: () => String }, province: { nullable: true, type: () => String }, postalCode: { nullable: true, type: () => String }, phone: { nullable: true, type: () => String }, email: { nullable: true, type: () => String }, otherClasses: { nullable: true, type: () => String }, instrument: { nullable: true, type: () => String }, level: { nullable: true, type: () => String }, unavailable: { nullable: true, type: () => String }, photoPermission: { nullable: true, type: () => Boolean }, age: { nullable: true } } }], [import("./submissions/selection/dto/selection.input"), { "SelectionInput": { title: { nullable: true, type: () => String }, largerWork: { nullable: true, type: () => String }, movement: { nullable: true, type: () => String }, composer: { nullable: true, type: () => String }, duration: { nullable: true, type: () => String } } }], [import("./submissions/registered-class/dto/registered-class.input"), { "RegisteredClassInput": { classType: { nullable: true, type: () => String }, classNumber: { nullable: true, type: () => String }, discipline: { nullable: true, type: () => String }, subdiscipline: { nullable: true, type: () => String }, level: { nullable: true, type: () => String }, category: { nullable: true, type: () => String }, numberOfSelections: { nullable: true }, minSelections: { nullable: true }, maxSelections: { nullable: true }, price: { nullable: true }, schoolGroupID: { nullable: true }, communityGroupID: { nullable: true } } }], [import("./submissions/school/dto/school.input"), { "SchoolInput": { name: { nullable: true, type: () => String }, division: { nullable: true, type: () => String }, address: { nullable: true, type: () => String }, city: { nullable: true, type: () => String }, province: { nullable: true, type: () => String }, postalCode: { nullable: true, type: () => String }, phone: { nullable: true, type: () => String } } }], [import("./submissions/school-group/dto/school-group.input"), { "SchoolGroupInput": { name: { nullable: true, type: () => String }, conflictPerformers: { nullable: true, type: () => String }, earliestTime: { nullable: true, type: () => String }, latestTime: { nullable: true, type: () => String }, unavailable: { nullable: true, type: () => String }, photoPermission: { nullable: true, type: () => Boolean }, groupSize: { nullable: true }, chaperones: { nullable: true }, wheelchairs: { nullable: true } } }], [import("./submissions/teacher/dto/teacher.input"), { "TeacherInput": { firstName: { nullable: true, type: () => String }, lastName: { nullable: true, type: () => String }, address: { nullable: true, type: () => String }, city: { nullable: true, type: () => String }, province: { nullable: true, type: () => String }, privateTeacher: { nullable: true, type: () => Boolean }, schoolTeacher: { nullable: true, type: () => Boolean }, postalCode: { nullable: true, type: () => String }, phone: { nullable: true, type: () => String }, email: { nullable: true, type: () => String }, instrument: { nullable: true, type: () => String } } }], [import("./submissions/teacher/dto/teacherType.input"), { "TeacherTypeInput": { teacherType: { type: () => Object } } }], [import("./auth/dto/credentials-signin.input"), { "CredentialsSignin": { email: { type: () => String }, password: { type: () => String } } }], [import("./auth/dto/credentials-signup.input"), { "CredentialsSignup": { firstName: { type: () => String }, lastName: { type: () => String }, email: { type: () => String }, password: { type: () => String }, privateTeacher: { type: () => Boolean }, schoolTeacher: { type: () => Boolean }, instrument: { nullable: true, type: () => String } } }], [import("./auth/entities/auth.entity"), { "AuthPayload": { userErrors: { type: () => [t["./common.entity"].UserError] }, diatonicToken: { nullable: true, type: () => String }, user: { nullable: true } }, "PasswordExists": { pass: { type: () => Boolean }, id: {} }, "EmailExists": { email: { nullable: true, type: () => String } }, "PasswordChangePayload": { userErrors: { type: () => [t["./common.entity"].UserError] }, passwordChanged: { type: () => Boolean } } }], [import("./email-confirmation/dto/password-change-resend.input"), { "PasswordChangeResend": { email: { type: () => String } } }], [import("./auth/dto/password-change.input"), { "PasswordChangeInput": { password1: { type: () => String }, password2: { type: () => String }, resetToken: { type: () => String } } }], [import("./submissions/field-config/dto/field-config.input"), { "FieldConfigInput": { tableName: { nullable: true, type: () => String }, fieldName: { nullable: true, type: () => String }, submissionRequired: { nullable: true, type: () => Boolean }, communityRequired: { nullable: true, type: () => Boolean }, groupRequired: { nullable: true, type: () => Boolean }, schoolRequired: { nullable: true, type: () => Boolean }, soloRequired: { nullable: true, type: () => Boolean }, customField: { nullable: true, type: () => Boolean }, customFieldType: { nullable: true, type: () => String } } }], [import("./festival/festival-class/dto/festival-class.input"), { "FestivalClassInput": { classNumber: { type: () => String }, requiredSelection: { nullable: true, type: () => String }, performerType: { type: () => t["./common.entity"].PerformerType }, price: { nullable: true, type: () => Number }, description: { type: () => String }, classTypeID: {}, subdisciplineID: {}, levelID: {}, categoryID: {}, maxSelections: {}, minSelections: {} }, "FestivalClassSearchArgs": { subdisciplineID: { nullable: true }, levelID: { nullable: true }, categoryID: { nullable: true } } }], [import("./festival/category/dto/category.input"), { "CategoryInput": { name: { type: () => String }, description: { nullable: true, type: () => String }, requiredComposer: { nullable: true, type: () => String } } }], [import("./festival/class-type/dto/class-type.input"), { "ClassTypeInput": { name: { type: () => String }, description: { nullable: true, type: () => String } } }], [import("./festival/level/dto/level.input"), { "LevelInput": { name: { type: () => String }, description: { nullable: true, type: () => String } } }], [import("./festival/discipline/dto/discipline.input"), { "DisciplineInput": { name: { type: () => String } } }], [import("./festival/instrument/dto/instrument.input"), { "InstrumentInput": { name: { type: () => String }, disciplineID: { nullable: true, type: () => Number }, mozart: { nullable: true, type: () => Boolean } } }], [import("./festival/subdiscipline/dto/subdiscipline.input"), { "SubdisciplineInput": { name: { type: () => String }, description: { nullable: true, type: () => String }, performerType: { type: () => t["./common.entity"].PerformerType }, disciplineID: {}, maxPerformers: { nullable: true }, minPerformers: { nullable: true }, price: { nullable: true } } }], [import("./festival/trophy/dto/trophy.input"), { "TrophyInput": { name: { type: () => String }, description: { nullable: true, type: () => String } } }], [import("./submissions/submission/entities/submission.entity"), { "Submission": { confirmation: { type: () => String }, submittedAt: {}, payedAmt: { nullable: true } }, "SubmissionPayload": { userErrors: { type: () => [t["./common.entity"].UserError] }, submission: { type: () => t["./submissions/submission/entities/submission.entity"].Submission } } }], [import("./submissions/submission/dto/submission.input"), { "SubmissionInput": { submittedAt: { type: () => Date }, confirmation: { type: () => String }, payedAmt: { nullable: true } } }]] } };
};