import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'

@ObjectType()
export class Tbl_userMaxAggregate {
  @Field(() => Int, { nullable: true })
  id?: number

  @Field(() => String, { nullable: true })
  email?: string

  @Field(() => String, { nullable: true })
  password?: string

  @Field(() => Boolean, { nullable: true })
  staff?: boolean

  @Field(() => Boolean, { nullable: true })
  admin?: boolean

  @Field(() => String, { nullable: true })
  firstName?: string

  @Field(() => String, { nullable: true })
  lastName?: string

  @Field(() => String, { nullable: true })
  apartment?: string

  @Field(() => String, { nullable: true })
  streetNumber?: string

  @Field(() => String, { nullable: true })
  streetName?: string

  @Field(() => String, { nullable: true })
  city?: string

  @Field(() => String, { nullable: true })
  province?: string

  @Field(() => String, { nullable: true })
  postalCode?: string

  @Field(() => String, { nullable: true })
  phone?: string

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | string

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string
}
