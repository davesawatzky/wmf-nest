/* eslint-disable perfectionist/sort-imports */
import { join } from 'node:path'
import process from 'node:process'
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup'
import { APP_FILTER } from '@nestjs/core'
import { AuthModule } from '@/auth/auth.module'
import { AbilityModule } from '@/ability/ability.module'
import { FieldConfigModule } from '@/submissions/field-config/field-config.module'
import { EmailModule } from '@/email/email.module'
import { EmailConfirmationModule } from '@/email-confirmation/email-confirmation.module'
import { FestivalClassModule } from '@/festival/festival-class/festival-class.module'
import { ClassTypeModule } from '@/festival/class-type/class-type.module'
import { DisciplineModule } from '@/festival/discipline/discipline.module'
import { SubdisciplineModule } from '@/festival/subdiscipline/subdiscipline.module'
import { CategoryModule } from '@/festival/category/category.module'
import { LevelModule } from '@/festival/level/level.module'
import { RegisteredClassModule } from '@/submissions/registered-class/registered-class.module'
import { RegistrationModule } from '@/submissions/registration/registration.module'
import { SelectionModule } from '@/submissions/selection/selection.module'
import { InstrumentModule } from '@/festival/instrument/instrument.module'
import { TrophyModule } from '@/festival/trophy/trophy.module'
import { PaymentModule } from '@/payment/payment.module'
import { PrismaModule } from '@/prisma/prisma.module'
import { CommunityModule } from '@/submissions/community/community.module'
import { CommunityGroupModule } from '@/submissions/community-group/community-group.module'
import { GroupModule } from '@/submissions/group/group.module'
import { PerformerModule } from '@/submissions/performer/performer.module'
import { SchoolModule } from '@/submissions/school/school.module'
import { SchoolGroupModule } from '@/submissions/school-group/school-group.module'
import { TeacherModule } from '@/submissions/teacher/teacher.module'
import { UserModule } from '@/user/user.module'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloServerPluginUsageReportingDisabled } from '@apollo/server/plugin/disabled'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import metadata from './metadata'
import { OrderModule } from './submissions/order/order.module'
import { ItemModule } from './festival/item/item.module'
import { OrderItemModule } from './submissions/order-item/order-item.module'
import { GraphQLDecimal } from 'prisma-graphql-type-decimal'

@Module({
  providers: [{
    provide: APP_FILTER,
    useClass: SentryGlobalFilter,
  }],
  imports: [
    SentryModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      context: ({ req, res }) => ({ req, res }),
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      metadata,
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      resolvers: {
        Decimal: GraphQLDecimal,
      },
      playground: false,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault(),
        ApolloServerPluginUsageReportingDisabled(),
      ],
    }),
    PrismaModule,
    AuthModule,
    FieldConfigModule,
    ClassTypeModule,
    FestivalClassModule,
    DisciplineModule,
    SubdisciplineModule,
    CategoryModule,
    LevelModule,
    RegisteredClassModule,
    RegistrationModule,
    SelectionModule,
    CommunityModule,
    CommunityGroupModule,
    InstrumentModule,
    PerformerModule,
    GroupModule,
    SchoolModule,
    SchoolGroupModule,
    TrophyModule,
    UserModule,
    TeacherModule,
    AbilityModule,
    // SubmissionModule,
    EmailModule,
    EmailConfirmationModule,
    PaymentModule,
    ItemModule,
    OrderModule,
    OrderItemModule,
  ],

})
export class AppModule {}
