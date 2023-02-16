import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { ID } from '@nestjs/graphql'
import { tbl_registration } from '../tbl-registration/tbl-registration.model'
import { Tbl_userCount } from '../prisma/tbl-user-count.output'

@ObjectType()
export class tbl_user {
  @Field(() => ID, { nullable: false })
  id!: number

  @Field(() => String, { nullable: false })
  email!: string

  @Field(() => String, { nullable: false })
  password!: string

  @Field(() => Boolean, { nullable: false, defaultValue: false })
  staff!: boolean

  @Field(() => Boolean, { nullable: false, defaultValue: false })
  admin!: boolean

  @Field(() => String, { nullable: true })
  firstName!: string | null

  @Field(() => String, { nullable: true })
  lastName!: string | null

  @Field(() => String, { nullable: true })
  apartment!: string | null

  @Field(() => String, { nullable: true })
  streetNumber!: string | null

  @Field(() => String, { nullable: true })
  streetName!: string | null

  @Field(() => String, { nullable: true })
  city!: string | null

  @Field(() => String, { nullable: true })
  province!: string | null

  @Field(() => String, { nullable: true })
  postalCode!: string | null

  @Field(() => String, { nullable: true })
  phone!: string | null

  @Field(() => Date, { nullable: false })
  updatedAt!: Date

  @Field(() => Date, { nullable: false })
  createdAt!: Date

  @Field(() => [tbl_registration], { nullable: true })
  tbl_registration?: Array<tbl_registration>

  @Field(() => Tbl_userCount, { nullable: false })
  _count?: Tbl_userCount
}
