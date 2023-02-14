
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum SGSlabel {
    SOLO = "SOLO",
    GROUP = "GROUP",
    SCHOOL = "SCHOOL",
    COMMUNITY = "COMMUNITY"
}

export class CategoryInput {
    name: string;
    description?: Nullable<string>;
    requiredComposer?: Nullable<string>;
}

export class DisciplineInput {
    name: string;
}

export class FestivalClassInput {
    classNumber: string;
    maxSelection: number;
    minSelection: number;
    requiredSelection?: Nullable<string>;
    SGSlabel: SGSlabel;
    price?: Nullable<number>;
}

export class FestivalClassSearchArgs {
    subdisciplineID?: Nullable<number>;
    levelID?: Nullable<number>;
    categoryID?: Nullable<number>;
}

export class InstrumentInput {
    name?: Nullable<string>;
}

export class LevelInput {
    name: string;
    description?: Nullable<string>;
}

export class SubdisciplineInput {
    name: string;
    description?: Nullable<string>;
    maxPerformers?: Nullable<number>;
    minPerformers?: Nullable<number>;
    SGSlabel?: Nullable<SGSlabel>;
    price?: Nullable<number>;
}

export class TrophyInput {
    name: string;
    description?: Nullable<string>;
}

export class CommunityInput {
    name: string;
    conflictPerformers?: Nullable<string>;
    groupSize?: Nullable<number>;
    chaperones?: Nullable<number>;
    wheelchairs?: Nullable<number>;
    earliestTime?: Nullable<string>;
    latestTime?: Nullable<string>;
    unavailable?: Nullable<string>;
}

export class GroupInput {
    name: string;
    groupType?: Nullable<string>;
    numberOfPerformers?: Nullable<number>;
    age?: Nullable<number>;
    instruments?: Nullable<string>;
}

export class PerformerInput {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    apartment?: Nullable<string>;
    streetNumber?: Nullable<string>;
    streetName?: Nullable<string>;
    city: string;
    province: string;
    postalCode?: Nullable<string>;
    phone?: Nullable<string>;
    email?: Nullable<EmailAddress>;
    age?: Nullable<number>;
    otherClasses?: Nullable<string>;
    instrument?: Nullable<string>;
    level?: Nullable<string>;
}

export class RegisteredClassInput {
    classNumber?: Nullable<string>;
    discipline?: Nullable<string>;
    subdiscipline?: Nullable<string>;
    level?: Nullable<string>;
    category?: Nullable<string>;
    numberOfSelections?: Nullable<number>;
    price?: Nullable<number>;
    schoolCommunityId?: Nullable<number>;
}

export class RegistrationInput {
    label?: Nullable<string>;
    performerType?: Nullable<SGSlabel>;
    dateSubmitted?: Nullable<string>;
    submittedAt?: Nullable<string>;
    totalAmt?: Nullable<number>;
    payedAmt?: Nullable<number>;
    transactionInfo?: Nullable<string>;
    confirmation?: Nullable<string>;
}

export class SchoolInput {
    name?: Nullable<string>;
    division?: Nullable<string>;
    streetNumber?: Nullable<string>;
    streetName?: Nullable<string>;
    city?: Nullable<string>;
    province?: Nullable<string>;
    postalCode?: Nullable<string>;
    phone?: Nullable<string>;
}

export class SelectionInput {
    title?: Nullable<string>;
    largerWork?: Nullable<string>;
    movement?: Nullable<string>;
    composer?: Nullable<string>;
    duration?: Nullable<string>;
}

export class TeacherInput {
    prefix?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    apartment?: Nullable<string>;
    streetNumber?: Nullable<string>;
    streetName?: Nullable<string>;
    city: string;
    province: string;
    postalCode?: Nullable<string>;
    phone?: Nullable<string>;
    email?: Nullable<EmailAddress>;
}

export class UserInput {
    staff?: Nullable<boolean>;
    admin?: Nullable<boolean>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    apartment?: Nullable<string>;
    streetNumber?: Nullable<string>;
    streetName?: Nullable<string>;
    city?: Nullable<string>;
    province?: Nullable<string>;
    postalCode?: Nullable<string>;
    phone?: Nullable<string>;
}

export class UserError {
    message: string;
    field: string[];
}

export class Category {
    id: number;
    name: string;
    description?: Nullable<string>;
    requiredComposer?: Nullable<string>;
    classes: FestivalClass[];
}

export abstract class IQuery {
    abstract categories(levelID?: Nullable<number>, subdisciplineID?: Nullable<number>): Nullable<Nullable<Category>[]> | Promise<Nullable<Nullable<Category>[]>>;

    abstract category(id: number): Nullable<Category> | Promise<Nullable<Category>>;

    abstract disciplines(): Nullable<Nullable<Discipline>[]> | Promise<Nullable<Nullable<Discipline>[]>>;

    abstract discipline(id: number): Nullable<Discipline> | Promise<Nullable<Discipline>>;

    abstract disciplinesByName(name: string): Nullable<Nullable<Discipline>[]> | Promise<Nullable<Nullable<Discipline>[]>>;

    abstract disciplinesByType(SGSlabel: SGSlabel): Nullable<Nullable<Discipline>[]> | Promise<Nullable<Nullable<Discipline>[]>>;

    abstract festivalClasses(SGSlabel?: Nullable<SGSlabel>, subdisciplineID?: Nullable<number>, levelID?: Nullable<number>, categoryID?: Nullable<number>): FestivalClass[] | Promise<FestivalClass[]>;

    abstract festivalClassSearch(festivalClassSearchArgs: FestivalClassSearchArgs): FestivalClass[] | Promise<FestivalClass[]>;

    abstract festivalClass(id: number): FestivalClass | Promise<FestivalClass>;

    abstract festivalClassByNumber(festivalClassNumber: string): Nullable<FestivalClass> | Promise<Nullable<FestivalClass>>;

    abstract instruments(): Nullable<Instrument>[] | Promise<Nullable<Instrument>[]>;

    abstract instrument(id: number): Nullable<Instrument> | Promise<Nullable<Instrument>>;

    abstract levels(subdisciplineID?: Nullable<number>, categoryID?: Nullable<number>): Nullable<Nullable<Level>[]> | Promise<Nullable<Nullable<Level>[]>>;

    abstract level(id: number): Nullable<Level> | Promise<Nullable<Level>>;

    abstract subdisciplines(disciplineID?: Nullable<number>, levelID?: Nullable<number>, categoryID?: Nullable<number>): Nullable<Nullable<Subdiscipline>[]> | Promise<Nullable<Nullable<Subdiscipline>[]>>;

    abstract subdiscipline(id: number): Nullable<Subdiscipline> | Promise<Nullable<Subdiscipline>>;

    abstract subdisciplinesByName(name: string): Subdiscipline[] | Promise<Subdiscipline[]>;

    abstract subdisciplinesByType(SGSlabel: SGSlabel, disciplineID?: Nullable<number>): Subdiscipline[] | Promise<Subdiscipline[]>;

    abstract trophies(): Nullable<Trophy>[] | Promise<Nullable<Trophy>[]>;

    abstract trophy(id: number): Nullable<Trophy> | Promise<Nullable<Trophy>>;

    abstract communities(): Community[] | Promise<Community[]>;

    abstract community(id: number): Community | Promise<Community>;

    abstract groups(): Nullable<Group>[] | Promise<Nullable<Group>[]>;

    abstract group(id: number): Nullable<Group> | Promise<Nullable<Group>>;

    abstract performers(): Nullable<Performer>[] | Promise<Nullable<Performer>[]>;

    abstract performer(id: number): Nullable<Performer> | Promise<Nullable<Performer>>;

    abstract registeredClasses(): Nullable<RegisteredClass>[] | Promise<Nullable<RegisteredClass>[]>;

    abstract registeredClass(id: number): Nullable<RegisteredClass> | Promise<Nullable<RegisteredClass>>;

    abstract registrations(): Nullable<Registration>[] | Promise<Nullable<Registration>[]>;

    abstract registration(id: number): Nullable<Registration> | Promise<Nullable<Registration>>;

    abstract schools(): Nullable<School>[] | Promise<Nullable<School>[]>;

    abstract school(id: number, name?: Nullable<string>): Nullable<School> | Promise<Nullable<School>>;

    abstract selections(): Nullable<Selection>[] | Promise<Nullable<Selection>[]>;

    abstract selection(id: number): Nullable<Selection> | Promise<Nullable<Selection>>;

    abstract teachers(): Nullable<Teacher>[] | Promise<Nullable<Teacher>[]>;

    abstract teacher(id: number): Nullable<Teacher> | Promise<Nullable<Teacher>>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id?: Nullable<number>, firstName?: Nullable<string>, lastName?: Nullable<string>, phone?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createCategory(categoryInput: CategoryInput): CategoryPayload | Promise<CategoryPayload>;

    abstract updateCategory(categoryID: number, categoryInput: CategoryInput): CategoryPayload | Promise<CategoryPayload>;

    abstract removeCategory(categoryID: number): Nullable<CategoryPayload> | Promise<Nullable<CategoryPayload>>;

    abstract createDiscipline(disciplineInput: DisciplineInput): Nullable<DisciplinePayload> | Promise<Nullable<DisciplinePayload>>;

    abstract updateDiscipline(id: number, disciplineInput: DisciplineInput): Nullable<DisciplinePayload> | Promise<Nullable<DisciplinePayload>>;

    abstract removeDiscipline(id: number): Nullable<DisciplinePayload> | Promise<Nullable<DisciplinePayload>>;

    abstract createFestivalClass(SGSlabel: SGSlabel, festivalClass: FestivalClassInput): FestivalClassPayload | Promise<FestivalClassPayload>;

    abstract updateFestivalClass(festivalClassID: number, festivalClass: FestivalClassInput): FestivalClassPayload | Promise<FestivalClassPayload>;

    abstract removeFestivalClass(festivalClassID: number): Nullable<FestivalClassPayload> | Promise<Nullable<FestivalClassPayload>>;

    abstract createInstrument(instrument: InstrumentInput): InstrumentPayload | Promise<InstrumentPayload>;

    abstract updateInstrument(instrumentID: number, instrument: InstrumentInput): InstrumentPayload | Promise<InstrumentPayload>;

    abstract removeInstrument(id: number): Nullable<InstrumentPayload> | Promise<Nullable<InstrumentPayload>>;

    abstract createLevel(level: LevelInput): LevelPayload | Promise<LevelPayload>;

    abstract updateLevel(levelID: number, level: LevelInput): LevelPayload | Promise<LevelPayload>;

    abstract removeLevel(levelID: number): Nullable<LevelPayload> | Promise<Nullable<LevelPayload>>;

    abstract createSubdiscipline(disciplineID: number, subdiscipline: SubdisciplineInput): SubdisciplinePayload | Promise<SubdisciplinePayload>;

    abstract updateSubdiscipline(subdisciplineID: number, subdiscipline: SubdisciplineInput): SubdisciplinePayload | Promise<SubdisciplinePayload>;

    abstract removeSubdiscipline(subdisciplineID: number): Nullable<SubdisciplinePayload> | Promise<Nullable<SubdisciplinePayload>>;

    abstract createTrophy(trophyInput: TrophyInput): TrophyPayload | Promise<TrophyPayload>;

    abstract updateTrophy(id: number, trophyInput: TrophyInput): TrophyPayload | Promise<TrophyPayload>;

    abstract removeTrophy(id: number): Nullable<TrophyPayload> | Promise<Nullable<TrophyPayload>>;

    abstract createCommunity(registrationID: number, communityInput: CommunityInput): CommunityPayload | Promise<CommunityPayload>;

    abstract updateCommunity(communityID: number, communityInput: CommunityInput): CommunityPayload | Promise<CommunityPayload>;

    abstract removeCommunity(communityID: number): CommunityPayload | Promise<CommunityPayload>;

    abstract createGroup(registrationID: number, groupInput: GroupInput): GroupPayload | Promise<GroupPayload>;

    abstract updateGroup(id: number, groupInput: GroupInput): GroupPayload | Promise<GroupPayload>;

    abstract removeGroup(id: number): GroupPayload | Promise<GroupPayload>;

    abstract createPerformer(registrationID: number, performerInput: PerformerInput): PerformerPayload | Promise<PerformerPayload>;

    abstract updatePerformer(performerID: number, performerInput: PerformerInput): PerformerPayload | Promise<PerformerPayload>;

    abstract removePerformer(performerID: number): Nullable<PerformerPayload> | Promise<Nullable<PerformerPayload>>;

    abstract createRegisteredClass(registrationID: number, registeredClass: RegisteredClassInput): RegisteredClassPayload | Promise<RegisteredClassPayload>;

    abstract updateRegisteredClass(registeredClassID: number, registeredClass: RegisteredClassInput): RegisteredClassPayload | Promise<RegisteredClassPayload>;

    abstract removeRegisteredClass(registeredClassID: number): Nullable<RegisteredClassPayload> | Promise<Nullable<RegisteredClassPayload>>;

    abstract registrationCreate(performerType: SGSlabel, label?: Nullable<string>): RegistrationPayload | Promise<RegistrationPayload>;

    abstract registrationUpdate(registrationID: number, registration: RegistrationInput): RegistrationPayload | Promise<RegistrationPayload>;

    abstract registrationDelete(registrationID: number): RegistrationPayload | Promise<RegistrationPayload>;

    abstract createSchool(registrationID: number, school: SchoolInput): SchoolPayload | Promise<SchoolPayload>;

    abstract updateSchool(schoolID: number, school: SchoolInput): SchoolPayload | Promise<SchoolPayload>;

    abstract removeSchool(schoolID: number): Nullable<SchoolPayload> | Promise<Nullable<SchoolPayload>>;

    abstract createSelection(registeredClassID: number, selection: SelectionInput): SelectionPayload | Promise<SelectionPayload>;

    abstract updateSelection(selectionID: number, selection: SelectionInput): SelectionPayload | Promise<SelectionPayload>;

    abstract removeSelection(selectionID: number): Nullable<SelectionPayload> | Promise<Nullable<SelectionPayload>>;

    abstract createTeacher(registrationID: number, teacher: TeacherInput): TeacherPayload | Promise<TeacherPayload>;

    abstract updateTeacher(teacherID: number, teacher: TeacherInput): TeacherPayload | Promise<TeacherPayload>;

    abstract removeTeacher(teacherID: number): Nullable<TeacherPayload> | Promise<Nullable<TeacherPayload>>;

    abstract createUser(userInput: UserInput): UserPayload | Promise<UserPayload>;

    abstract updateUser(id: number, userInput: UserInput): UserPayload | Promise<UserPayload>;

    abstract removeUser(id: number): UserPayload | Promise<UserPayload>;
}

export class CategoryPayload {
    userErrors: UserError[];
    category?: Nullable<Category>;
}

export class Discipline {
    id: number;
    name?: Nullable<string>;
    subdisciplines?: Nullable<Nullable<Subdiscipline>[]>;
}

export class DisciplinePayload {
    userErrors: UserError[];
    discipline?: Nullable<Discipline>;
}

export class FestivalClass {
    id: number;
    classNumber: string;
    subdiscipline: Subdiscipline;
    level: Level;
    category: Category;
    maxSelection: number;
    minSelection: number;
    requiredSelection?: Nullable<string>;
    SGSlabel: SGSlabel;
    price?: Nullable<number>;
    trophies?: Nullable<Nullable<Trophy>[]>;
}

export class FestivalClassPayload {
    userErrors: UserError[];
    festivalClass?: Nullable<FestivalClass>;
}

export class Instrument {
    id: number;
    name: string;
}

export class InstrumentPayload {
    userErrors: UserError[];
    instrument?: Nullable<Instrument>;
}

export class Level {
    id: number;
    name: string;
    description?: Nullable<string>;
    classes: Nullable<FestivalClass>[];
}

export class LevelPayload {
    userErrors: UserError[];
    level?: Nullable<Level>;
}

export class Subdiscipline {
    id: number;
    name: string;
    discipline: Discipline;
    description?: Nullable<string>;
    maxPerformers?: Nullable<number>;
    minPerformers?: Nullable<number>;
    SGSlabel: SGSlabel;
    price?: Nullable<number>;
    classes: FestivalClass[];
}

export class SubdisciplinePayload {
    userErrors: UserError[];
    subdiscpline?: Nullable<Subdiscipline>;
}

export class Trophy {
    id: number;
    name: string;
    description?: Nullable<string>;
    classes?: Nullable<Nullable<FestivalClass>[]>;
}

export class TrophyPayload {
    userErrors: UserError[];
    trophy?: Nullable<Trophy>;
}

export class Community {
    id: number;
    name: string;
    conflictPerformers?: Nullable<string>;
    groupSize?: Nullable<number>;
    chaperones?: Nullable<number>;
    wheelchairs?: Nullable<number>;
    earliestTime?: Nullable<string>;
    latestTime?: Nullable<string>;
    unavailable?: Nullable<string>;
}

export class CommunityPayload {
    userErrors: UserError[];
    community?: Nullable<Community>;
}

export class Group {
    id: string;
    name?: Nullable<string>;
    groupType?: Nullable<string>;
    numberOfPerformers?: Nullable<number>;
    age?: Nullable<number>;
    instruments?: Nullable<string>;
}

export class GroupPayload {
    userErrors: UserError[];
    group?: Nullable<Group>;
}

export class Performer {
    id: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    apartment?: Nullable<string>;
    streetNumber?: Nullable<string>;
    streetName?: Nullable<string>;
    city?: Nullable<string>;
    province?: Nullable<string>;
    postalCode?: Nullable<string>;
    phone?: Nullable<string>;
    email?: Nullable<EmailAddress>;
    age?: Nullable<number>;
    otherClasses?: Nullable<string>;
    instrument?: Nullable<string>;
    level?: Nullable<string>;
}

export class PerformerPayload {
    userErrors: UserError[];
    performer?: Nullable<Performer>;
}

export class RegisteredClass {
    id: string;
    selections?: Nullable<Nullable<Selection>[]>;
    classNumber?: Nullable<string>;
    discipline?: Nullable<string>;
    subdiscipline?: Nullable<string>;
    level?: Nullable<string>;
    category?: Nullable<string>;
    numberOfSelections?: Nullable<number>;
    price?: Nullable<number>;
    schoolCommunityId?: Nullable<number>;
}

export class RegisteredClassPayload {
    userErrors: UserError[];
    registeredClass?: Nullable<RegisteredClass>;
}

export class Registration {
    id: number;
    label?: Nullable<string>;
    performers?: Nullable<Nullable<Performer>[]>;
    registeredClasses?: Nullable<Nullable<RegisteredClass>[]>;
    groups?: Nullable<Nullable<Group>[]>;
    communities?: Nullable<Nullable<Community>[]>;
    teacher?: Nullable<Teacher>;
    school?: Nullable<School>;
    performerType: SGSlabel;
    submittedAt?: Nullable<DateTime>;
    totalAmt?: Nullable<number>;
    payedAmt?: Nullable<number>;
    transactionInfo?: Nullable<string>;
    confirmation?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
}

export class RegistrationPayload {
    userErrors: UserError[];
    registration?: Nullable<Registration>;
}

export class School {
    id: string;
    name: string;
    division?: Nullable<string>;
    streetNumber?: Nullable<string>;
    streetName?: Nullable<string>;
    city?: Nullable<string>;
    province?: Nullable<string>;
    postalCode?: Nullable<string>;
    phone?: Nullable<string>;
    schoolGroups?: Nullable<Nullable<Community>[]>;
}

export class SchoolPayload {
    userErrors: UserError[];
    school?: Nullable<School>;
}

export class Selection {
    id: string;
    title?: Nullable<string>;
    largerWork?: Nullable<string>;
    movement?: Nullable<string>;
    composer?: Nullable<string>;
    duration?: Nullable<string>;
}

export class SelectionPayload {
    userErrors: UserError[];
    selection?: Nullable<Selection>;
}

export class Teacher {
    id: string;
    prefix?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    apartment?: Nullable<string>;
    streetNumber?: Nullable<string>;
    streetName?: Nullable<string>;
    city?: Nullable<string>;
    province?: Nullable<string>;
    postalCode?: Nullable<string>;
    phone?: Nullable<string>;
    email?: Nullable<EmailAddress>;
}

export class TeacherPayload {
    userErrors: UserError[];
    teacher?: Nullable<Teacher>;
}

export class User {
    id: number;
    email?: Nullable<string>;
    staff?: Nullable<boolean>;
    admin?: Nullable<boolean>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    apartment?: Nullable<string>;
    streetNumber?: Nullable<string>;
    streetName?: Nullable<string>;
    city?: Nullable<string>;
    province?: Nullable<string>;
    postalCode?: Nullable<string>;
    phone?: Nullable<string>;
    registrations: Registration[];
}

export class UserPayload {
    userErrors: UserError[];
    user?: Nullable<User>;
}

export type DateTime = any;
export type Duration = any;
export type EmailAddress = any;
export type Time = any;
type Nullable<T> = T | null;
