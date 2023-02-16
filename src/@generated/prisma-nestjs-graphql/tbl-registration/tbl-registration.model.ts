import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { ID } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { tbl_registration_performerType } from './tbl-registration-performer-type.enum'
import { GraphQLDecimal } from 'prisma-graphql-type-decimal'
import { Decimal } from '@prisma/client/runtime'
import { tbl_user } from '../tbl-user/tbl-user.model'
import { tbl_reg_classes } from '../tbl-reg-classes/tbl-reg-classes.model'
import { tbl_reg_community } from '../tbl-reg-community/tbl-reg-community.model'
import { tbl_reg_group } from '../tbl-reg-group/tbl-reg-group.model'
import { tbl_reg_performer } from '../tbl-reg-performer/tbl-reg-performer.model'
import { tbl_reg_school } from '../tbl-reg-school/tbl-reg-school.model'
import { tbl_reg_teacher } from '../tbl-reg-teacher/tbl-reg-teacher.model'
import { Tbl_registrationCount } from '../prisma/tbl-registration-count.output'

@ObjectType()
export class tbl_registration {
  @Field(() => ID, { nullable: false })
  id!: number

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  userID!: number | null

  @Field(() => String, { nullable: false, defaultValue: 'Registration Form' })
  label!: string

  @Field(() => tbl_registration_performerType, {
    nullable: false,
    defaultValue: 'SOLO',
  })
  performerType!: keyof typeof tbl_registration_performerType

  @Field(() => Date, { nullable: true })
  submittedAt!: Date | null

  @Field(() => GraphQLDecimal, { nullable: true })
  totalAmt!: Decimal | null

  @Field(() => GraphQLDecimal, { nullable: true })
  payedAmt!: Decimal | null

  @Field(() => String, { nullable: true })
  transactionInfo!: string | null

  @Field(() => String, { nullable: true })
  confirmation!: string | null

  @Field(() => Date, { nullable: false })
  createdAt!: Date

  @Field(() => Date, { nullable: false })
  updatedAt!: Date

  @Field(() => tbl_user, { nullable: true })
  tbl_user?: tbl_user | null

  @Field(() => [tbl_reg_classes], { nullable: true })
  tbl_reg_classes?: Array<tbl_reg_classes>

  @Field(() => [tbl_reg_community], { nullable: true })
  tbl_reg_community?: Array<tbl_reg_community>

  @Field(() => [tbl_reg_group], { nullable: true })
  tbl_reg_group?: Array<tbl_reg_group>

  @Field(() => [tbl_reg_performer], { nullable: true })
  tbl_reg_performer?: Array<tbl_reg_performer>

  @Field(() => tbl_reg_school, { nullable: true })
  tbl_reg_school?: tbl_reg_school | null

  @Field(() => tbl_reg_teacher, { nullable: true })
  tbl_reg_teacher?: tbl_reg_teacher | null

  @Field(() => Tbl_registrationCount, { nullable: false })
  _count?: Tbl_registrationCount
}
