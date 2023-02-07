/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum SGSlabel {
  SOLO = 'SOLO',
  GROUP = 'GROUP',
  SCHOOL = 'SCHOOL',
  COMMUNITY = 'COMMUNITY',
}

export class CreateCategoryInput {
  id: string
  name: string
  description?: Nullable<string>
  requiredComposer?: Nullable<string>
  classes: FestivalClass[]
}

export class UpdateCategoryInput {
  id: string
  name?: Nullable<string>
  description?: Nullable<string>
  requiredComposer?: Nullable<string>
  classes: FestivalClass[]
}

export class CommunityInput {
  name?: Nullable<string>
  conflictPerformers?: Nullable<string>
  groupSize?: Nullable<number>
  chaperones?: Nullable<number>
  wheelchairs?: Nullable<number>
  earliestTime?: Nullable<string>
  latestTime?: Nullable<string>
  unavailable?: Nullable<string>
}

export class CreateDisciplineInput {
  name: string
}

export class UpdateDisciplineInput {
  id: number
  name: string
}

export class FestivalClassInput {
  classNumber: string
  subdiscipline?: Nullable<Subdiscipline>
  level?: Nullable<Level>
  category?: Nullable<Category>
  maxSelection?: Nullable<number>
  minSelection?: Nullable<number>
  requiredSelection?: Nullable<string>
  SGSlabel?: Nullable<SGSlabel>
  price?: Nullable<number>
}

export class FestivalClassSearchArgs {
  subdisciplineID?: Nullable<number>
  levelID?: Nullable<number>
  categoryID?: Nullable<number>
}

export class GroupInput {
  name?: Nullable<string>
  groupType?: Nullable<string>
  numberOfPerformers?: Nullable<number>
  age?: Nullable<number>
  instruments?: Nullable<string>
}

export class InstrumentInput {
  name?: Nullable<string>
}

export class LevelInput {
  name: string
  description?: Nullable<string>
}

export class PerformerInput {
  firstName?: Nullable<string>
  lastName?: Nullable<string>
  apartment?: Nullable<string>
  streetNumber?: Nullable<string>
  streetName?: Nullable<string>
  city: string
  province: string
  postalCode?: Nullable<string>
  phone?: Nullable<string>
  email?: Nullable<EmailAddress>
  age?: Nullable<number>
  otherClasses?: Nullable<string>
  instrument?: Nullable<string>
  level?: Nullable<string>
}

export class RegisteredClassInput {
  classNumber?: Nullable<string>
  discipline?: Nullable<string>
  subdiscipline?: Nullable<string>
  level?: Nullable<string>
  category?: Nullable<string>
  numberOfSelections?: Nullable<number>
  price?: Nullable<number>
  schoolCommunityId?: Nullable<number>
}

export class RegistrationInput {
  label?: Nullable<string>
  performerType?: Nullable<SGSlabel>
  dateSubmitted?: Nullable<string>
  submittedAt?: Nullable<string>
  totalAmt?: Nullable<number>
  payedAmt?: Nullable<number>
  transactionInfo?: Nullable<string>
  confirmation?: Nullable<string>
}

export class SchoolInput {
  name?: Nullable<string>
  division?: Nullable<string>
  streetNumber?: Nullable<string>
  streetName?: Nullable<string>
  city?: Nullable<string>
  province?: Nullable<string>
  postalCode?: Nullable<string>
  phone?: Nullable<string>
}

export class SelectionInput {
  title?: Nullable<string>
  largerWork?: Nullable<string>
  movement?: Nullable<string>
  composer?: Nullable<string>
  duration?: Nullable<string>
}

export class SubdisciplineInput {
  name?: Nullable<string>
  discipline?: Nullable<Discipline>
  description?: Nullable<string>
  maxPerformers?: Nullable<number>
  minPerformers?: Nullable<number>
  SGSlabel?: Nullable<SGSlabel>
  price?: Nullable<number>
}

export class TeacherInput {
  prefix?: Nullable<string>
  firstName?: Nullable<string>
  lastName?: Nullable<string>
  apartment?: Nullable<string>
  streetNumber?: Nullable<string>
  streetName?: Nullable<string>
  city: string
  province: string
  postalCode?: Nullable<string>
  phone?: Nullable<string>
  email?: Nullable<EmailAddress>
}

export class CreateTrophyInput {
  name: string
  description: string
}

export class UpdateTrophyInput {
  id: number
  name: string
  description: string
  classes: FestivalClass[]
}

export class CreateUserInput {
  staff?: Nullable<boolean>
  admin?: Nullable<boolean>
  firstName?: Nullable<string>
  lastName?: Nullable<string>
  apartment?: Nullable<string>
  streetNumber?: Nullable<string>
  streetName?: Nullable<string>
  city?: Nullable<string>
  province?: Nullable<string>
  postalCode?: Nullable<string>
  phone?: Nullable<string>
}

export class UpdateUserInput {
  id: number
  staff?: Nullable<boolean>
  admin?: Nullable<boolean>
  firstName?: Nullable<string>
  lastName?: Nullable<string>
  apartment?: Nullable<string>
  streetNumber?: Nullable<string>
  streetName?: Nullable<string>
  city?: Nullable<string>
  province?: Nullable<string>
  postalCode?: Nullable<string>
  phone?: Nullable<string>
}

export class Category {
  id: number
  name: string
  description?: Nullable<string>
  requiredComposer?: Nullable<string>
  classes: FestivalClass[]
}

export abstract class IQuery {
  abstract categories(
    levelID?: Nullable<number>,
    subdisciplineID?: Nullable<number>,
  ): Category[] | Promise<Category[]>

  abstract categoriesByName(name: string): Category[] | Promise<Category[]>

  abstract category(id: number): Category | Promise<Category>

  abstract communities(): Community[] | Promise<Community[]>

  abstract community(id: number): Community | Promise<Community>

  abstract disciplines(): Discipline[] | Promise<Discipline[]>

  abstract discipline(id: number): Discipline | Promise<Discipline>

  abstract disciplinesByName(name: string): Discipline[] | Promise<Discipline[]>

  abstract disciplinesByType(
    SGSlabel: SGSlabel,
  ): Discipline[] | Promise<Discipline[]>

  abstract festivalClasses(
    SGSlabel?: Nullable<SGSlabel>,
  ): FestivalClass[] | Promise<FestivalClass[]>

  abstract festivalClassSearch(
    festivalClassSearchArgs: FestivalClassSearchArgs,
  ): FestivalClass[] | Promise<FestivalClass[]>

  abstract festivalClassById(id: number): FestivalClass | Promise<FestivalClass>

  abstract festivalClassByNumber(
    festivalClassNumber: string,
  ): Nullable<FestivalClass> | Promise<Nullable<FestivalClass>>

  abstract groups(): Nullable<Group>[] | Promise<Nullable<Group>[]>

  abstract group(id: number): Nullable<Group> | Promise<Nullable<Group>>

  abstract instruments():
    | Nullable<Instrument>[]
    | Promise<Nullable<Instrument>[]>

  abstract instrument(
    id: number,
  ): Nullable<Instrument> | Promise<Nullable<Instrument>>

  abstract levels(subdisciplineID: number): Level[] | Promise<Level[]>

  abstract level(id: number): Nullable<Level> | Promise<Nullable<Level>>

  abstract levelsByName(
    name: string,
  ): Nullable<Level[]> | Promise<Nullable<Level[]>>

  abstract performers(): Nullable<Performer>[] | Promise<Nullable<Performer>[]>

  abstract performer(
    id: number,
  ): Nullable<Performer> | Promise<Nullable<Performer>>

  abstract registeredClasses():
    | Nullable<RegisteredClass>[]
    | Promise<Nullable<RegisteredClass>[]>

  abstract registeredClass(
    id: number,
  ): Nullable<RegisteredClass> | Promise<Nullable<RegisteredClass>>

  abstract registrations():
    | Nullable<Registration>[]
    | Promise<Nullable<Registration>[]>

  abstract registration(
    id: number,
  ): Nullable<Registration> | Promise<Nullable<Registration>>

  abstract schools(): Nullable<School>[] | Promise<Nullable<School>[]>

  abstract school(
    id: number,
    name?: Nullable<string>,
  ): Nullable<School> | Promise<Nullable<School>>

  abstract selections(): Nullable<Selection>[] | Promise<Nullable<Selection>[]>

  abstract selection(
    id: number,
  ): Nullable<Selection> | Promise<Nullable<Selection>>

  abstract subdisciplines(
    disciplineID: number,
  ): Subdiscipline[] | Promise<Subdiscipline[]>

  abstract subdiscipline(
    id: number,
  ): Nullable<Subdiscipline> | Promise<Nullable<Subdiscipline>>

  abstract subdisciplinesByName(
    name: string,
  ): Subdiscipline[] | Promise<Subdiscipline[]>

  abstract subdisciplinesByType(
    disciplineID?: Nullable<number>,
    SGSlabel: SGSlabel,
  ): Subdiscipline[] | Promise<Subdiscipline[]>

  abstract teachers(): Nullable<Teacher>[] | Promise<Nullable<Teacher>[]>

  abstract teacher(id: number): Nullable<Teacher> | Promise<Nullable<Teacher>>

  abstract trophies(): Nullable<Trophy>[] | Promise<Nullable<Trophy>[]>

  abstract trophy(id: number): Nullable<Trophy> | Promise<Nullable<Trophy>>

  abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>

  abstract user(
    id?: Nullable<number>,
    firstName?: Nullable<string>,
    lastName?: Nullable<string>,
    phone?: Nullable<string>,
  ): Nullable<User> | Promise<Nullable<User>>
}

export abstract class IMutation {
  abstract createCategory(
    createCategoryInput: CreateCategoryInput,
  ): CategoryPayload | Promise<CategoryPayload>

  abstract updateCategory(
    updateCategoryInput: UpdateCategoryInput,
  ): CategoryPayload | Promise<CategoryPayload>

  abstract removeCategory(
    id: number,
  ): Nullable<CategoryPayload> | Promise<Nullable<CategoryPayload>>

  abstract communityCreate(
    registrationID: number,
    community: CommunityInput,
  ): CommunityPayload | Promise<CommunityPayload>

  abstract communityUpdate(
    communityID: number,
    community: CommunityInput,
  ): CommunityPayload | Promise<CommunityPayload>

  abstract communityDelete(
    communityID: number,
  ): CommunityPayload | Promise<CommunityPayload>

  abstract createDiscipline(
    createDisciplineInput: CreateDisciplineInput,
  ): Discipline | Promise<Discipline>

  abstract updateDiscipline(
    updateDisciplineInput: UpdateDisciplineInput,
  ): Discipline | Promise<Discipline>

  abstract removeDiscipline(
    id: number,
  ): Nullable<Discipline> | Promise<Nullable<Discipline>>

  abstract createFestivalClass(
    SGSlabel: SGSlabel,
    festivalClass: FestivalClassInput,
  ): FestivalClassPayload | Promise<FestivalClassPayload>

  abstract updateFestivalClass(
    festivalClassID: number,
    festivalClass: FestivalClassInput,
  ): FestivalClassPayload | Promise<FestivalClassPayload>

  abstract removeFestivalClass(
    festivalClassID: number,
  ): Nullable<FestivalClassPayload> | Promise<Nullable<FestivalClassPayload>>

  abstract groupCreate(
    registrationID: number,
    group: GroupInput,
  ): GroupPayload | Promise<GroupPayload>

  abstract groupUpdate(
    groupID: number,
    group: GroupInput,
  ): GroupPayload | Promise<GroupPayload>

  abstract groupDelete(groupID: number): GroupPayload | Promise<GroupPayload>

  abstract createInstrument(
    instrument: InstrumentInput,
  ): InstrumentPayload | Promise<InstrumentPayload>

  abstract updateInstrument(
    instrumentID: number,
    instrument: InstrumentInput,
  ): InstrumentPayload | Promise<InstrumentPayload>

  abstract removeInstrument(
    id: number,
  ): Nullable<InstrumentPayload> | Promise<Nullable<InstrumentPayload>>

  abstract createLevel(level: LevelInput): LevelPayload | Promise<LevelPayload>

  abstract updateLevel(
    levelID: number,
    level: LevelInput,
  ): LevelPayload | Promise<LevelPayload>

  abstract removeLevel(
    levelID: number,
  ): Nullable<LevelPayload> | Promise<Nullable<LevelPayload>>

  abstract createPerformer(
    registrationID: number,
    performerInput: PerformerInput,
  ): PerformerPayload | Promise<PerformerPayload>

  abstract updatePerformer(
    performerID: number,
    performerInput: PerformerInput,
  ): PerformerPayload | Promise<PerformerPayload>

  abstract removePerformer(
    performerID: number,
  ): Nullable<PerformerPayload> | Promise<Nullable<PerformerPayload>>

  abstract createRegisteredClass(
    registrationID: number,
    registeredClass: RegisteredClassInput,
  ): RegisteredClassPayload | Promise<RegisteredClassPayload>

  abstract updateRegisteredClass(
    registeredClassID: number,
    registeredClass: RegisteredClassInput,
  ): RegisteredClassPayload | Promise<RegisteredClassPayload>

  abstract removeRegisteredClass(
    registeredClassID: number,
  ):
    | Nullable<RegisteredClassPayload>
    | Promise<Nullable<RegisteredClassPayload>>

  abstract registrationCreate(
    performerType: SGSlabel,
    label?: Nullable<string>,
  ): RegistrationPayload | Promise<RegistrationPayload>

  abstract registrationUpdate(
    registrationID: number,
    registration: RegistrationInput,
  ): RegistrationPayload | Promise<RegistrationPayload>

  abstract registrationDelete(
    registrationID: number,
  ): RegistrationPayload | Promise<RegistrationPayload>

  abstract createSchool(
    registrationID: number,
    school: SchoolInput,
  ): SchoolPayload | Promise<SchoolPayload>

  abstract updateSchool(
    schoolID: number,
    school: SchoolInput,
  ): SchoolPayload | Promise<SchoolPayload>

  abstract removeSchool(
    schoolID: number,
  ): Nullable<SchoolPayload> | Promise<Nullable<SchoolPayload>>

  abstract createSelection(
    registeredClassID: number,
    selection: SelectionInput,
  ): SelectionPayload | Promise<SelectionPayload>

  abstract updateSelection(
    selectionID: number,
    selection: SelectionInput,
  ): SelectionPayload | Promise<SelectionPayload>

  abstract removeSelection(
    selectionID: number,
  ): Nullable<SelectionPayload> | Promise<Nullable<SelectionPayload>>

  abstract createSubdiscipline(
    disciplineID: number,
    subdiscipline: SubdisciplineInput,
  ): SubdisciplinePayload | Promise<SubdisciplinePayload>

  abstract updateSubdiscipline(
    subdisciplineID: number,
    subdiscipline: SubdisciplineInput,
  ): SubdisciplinePayload | Promise<SubdisciplinePayload>

  abstract removeSubdiscipline(
    subdisciplineID: number,
  ): Nullable<SubdisciplinePayload> | Promise<Nullable<SubdisciplinePayload>>

  abstract createTeacher(
    registrationID: number,
    teacher: TeacherInput,
  ): TeacherPayload | Promise<TeacherPayload>

  abstract updateTeacher(
    teacherID: number,
    teacher: TeacherInput,
  ): TeacherPayload | Promise<TeacherPayload>

  abstract removeTeacher(
    teacherID: number,
  ): Nullable<TeacherPayload> | Promise<Nullable<TeacherPayload>>

  abstract createTrophy(
    trophy: CreateTrophyInput,
  ): TrophyPayload | Promise<TrophyPayload>

  abstract updateTrophy(
    trophy: UpdateTrophyInput,
  ): TrophyPayload | Promise<TrophyPayload>

  abstract removeTrophy(
    trophyID: number,
  ): Nullable<TrophyPayload> | Promise<Nullable<TrophyPayload>>

  abstract createUser(
    createUserInput: CreateUserInput,
  ): UserPayload | Promise<UserPayload>

  abstract updateUser(
    updateUserInput: UpdateUserInput,
  ): UserPayload | Promise<UserPayload>

  abstract removeUser(id: number): UserPayload | Promise<UserPayload>
}

export class CategoryPayload {
  userErrors: UserError[]
  category?: Nullable<Category>
}

export class UserError {
  message: string
  field: string[]
}

export class Community {
  id: number
  name: string
  conflictPerformers?: Nullable<string>
  groupSize?: Nullable<number>
  chaperones?: Nullable<number>
  wheelchairs?: Nullable<number>
  earliestTime?: Nullable<string>
  latestTime?: Nullable<string>
  unavailable?: Nullable<string>
}

export class CommunityPayload {
  userErrors: UserError[]
  community?: Nullable<Community>
}

export class Discipline {
  id: number
  name: string
  subdisciplines: Subdiscipline[]
}

export class DisciplinePayload {
  userErrors: UserError[]
  discipline?: Nullable<Discipline>
}

export class FestivalClass {
  id: number
  festivalClassNumber: string
  subdiscipline?: Nullable<Subdiscipline>
  level?: Nullable<Level>
  category?: Nullable<Category>
  maxSelection?: Nullable<number>
  minSelection?: Nullable<number>
  requiredSelection?: Nullable<string>
  SGSlabel?: Nullable<SGSlabel>
  price?: Nullable<number>
  trophies?: Nullable<Nullable<Trophy>[]>
}

export class ClassTrophy {
  festivalClassID: number
  trophyID: number
}

export class FestivalClassPayload {
  userErrors: UserError[]
  festivalClass?: Nullable<FestivalClass>
}

export class Group {
  id: string
  name?: Nullable<string>
  groupType?: Nullable<string>
  numberOfPerformers?: Nullable<number>
  age?: Nullable<number>
  instruments?: Nullable<string>
}

export class GroupPayload {
  userErrors: UserError[]
  group?: Nullable<Group>
}

export class Instrument {
  id: number
  name: string
}

export class InstrumentPayload {
  userErrors: UserError[]
  instrument?: Nullable<Instrument>
}

export class Level {
  id: string
  name: string
  description?: Nullable<string>
  categories?: Nullable<Nullable<Category>[]>
  classes: FestivalClass[]
}

export class LevelPayload {
  userErrors: UserError[]
  level?: Nullable<Level>
}

export class Performer {
  id: string
  firstName?: Nullable<string>
  lastName?: Nullable<string>
  apartment?: Nullable<string>
  streetNumber?: Nullable<string>
  streetName?: Nullable<string>
  city?: Nullable<string>
  province?: Nullable<string>
  postalCode?: Nullable<string>
  phone?: Nullable<string>
  email?: Nullable<EmailAddress>
  age?: Nullable<number>
  otherClasses?: Nullable<string>
  instrument?: Nullable<string>
  level?: Nullable<string>
}

export class PerformerPayload {
  userErrors: UserError[]
  performer?: Nullable<Performer>
}

export class RegisteredClass {
  id: string
  selections?: Nullable<Nullable<Selection>[]>
  classNumber?: Nullable<string>
  discipline?: Nullable<string>
  subdiscipline?: Nullable<string>
  level?: Nullable<string>
  category?: Nullable<string>
  numberOfSelections?: Nullable<number>
  price?: Nullable<number>
  schoolCommunityId?: Nullable<number>
}

export class RegisteredClassPayload {
  userErrors: UserError[]
  registeredClass?: Nullable<RegisteredClass>
}

export class Registration {
  id: number
  label?: Nullable<string>
  performers?: Nullable<Nullable<Performer>[]>
  registeredClasses?: Nullable<Nullable<RegisteredClass>[]>
  groups?: Nullable<Nullable<Group>[]>
  communities?: Nullable<Nullable<Community>[]>
  teacher?: Nullable<Teacher>
  school?: Nullable<School>
  performerType: SGSlabel
  submittedAt?: Nullable<DateTime>
  totalAmt?: Nullable<number>
  payedAmt?: Nullable<number>
  transactionInfo?: Nullable<string>
  confirmation?: Nullable<string>
  createdAt?: Nullable<DateTime>
}

export class RegistrationPayload {
  userErrors: UserError[]
  registration?: Nullable<Registration>
}

export class School {
  id: string
  name: string
  division?: Nullable<string>
  streetNumber?: Nullable<string>
  streetName?: Nullable<string>
  city?: Nullable<string>
  province?: Nullable<string>
  postalCode?: Nullable<string>
  phone?: Nullable<string>
  schoolGroups?: Nullable<Nullable<Community>[]>
}

export class SchoolPayload {
  userErrors: UserError[]
  school?: Nullable<School>
}

export class Selection {
  id: string
  title?: Nullable<string>
  largerWork?: Nullable<string>
  movement?: Nullable<string>
  composer?: Nullable<string>
  duration?: Nullable<string>
}

export class SelectionPayload {
  userErrors: UserError[]
  selection?: Nullable<Selection>
}

export class Subdiscipline {
  id: string
  name: string
  discipline: Discipline
  description?: Nullable<string>
  maxPerformers?: Nullable<number>
  minPerformers: number
  SGSlabel: SGSlabel
  price: number
  levels?: Nullable<Nullable<Level>[]>
  classes: FestivalClass[]
}

export class SubdisciplinePayload {
  userErrors: UserError[]
  subdiscpline?: Nullable<Subdiscipline>
}

export class Teacher {
  id: string
  prefix?: Nullable<string>
  firstName?: Nullable<string>
  lastName?: Nullable<string>
  apartment?: Nullable<string>
  streetNumber?: Nullable<string>
  streetName?: Nullable<string>
  city?: Nullable<string>
  province?: Nullable<string>
  postalCode?: Nullable<string>
  phone?: Nullable<string>
  email?: Nullable<EmailAddress>
}

export class TeacherPayload {
  userErrors: UserError[]
  teacher?: Nullable<Teacher>
}

export class Trophy {
  id: number
  name: string
  description: string
  classes: FestivalClass[]
}

export class TrophyPayload {
  userErrors: UserError[]
  trophy?: Nullable<Trophy>
}

export class User {
  id: number
  email?: Nullable<string>
  staff?: Nullable<boolean>
  admin?: Nullable<boolean>
  firstName?: Nullable<string>
  lastName?: Nullable<string>
  apartment?: Nullable<string>
  streetNumber?: Nullable<string>
  streetName?: Nullable<string>
  city?: Nullable<string>
  province?: Nullable<string>
  postalCode?: Nullable<string>
  phone?: Nullable<string>
  registrations: Registration[]
}

export class UserPayload {
  userErrors: UserError[]
  user?: Nullable<User>
}

export type DateTime = any
export type Duration = any
export type EmailAddress = any
export type Time = any
type Nullable<T> = T | null
