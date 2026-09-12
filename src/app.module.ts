/* eslint-disable perfectionist/sort-imports */
import { join } from 'node:path'
import process from 'node:process'
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup'
import { APP_FILTER } from '@nestjs/core'
import { AuthModule } from '@/auth/auth.module.js'
import { AbilityModule } from '@/ability/ability.module.js'
import { FieldConfigModule } from '@/submissions/field-config/field-config.module.js'
import { EmailModule } from '@/email/email.module.js'
import { EmailConfirmationModule } from '@/email-confirmation/email-confirmation.module.js'
import { FestivalClassModule } from '@/festival/festival-class/festival-class.module.js'
import { ClassTypeModule } from '@/festival/class-type/class-type.module.js'
import { DisciplineModule } from '@/festival/discipline/discipline.module.js'
import { SubdisciplineModule } from '@/festival/subdiscipline/subdiscipline.module.js'
import { CategoryModule } from '@/festival/category/category.module.js'
import { LevelModule } from '@/festival/level/level.module.js'
import { RegisteredClassModule } from '@/submissions/registered-class/registered-class.module.js'
import { RegistrationModule } from '@/submissions/registration/registration.module.js'
import { SelectionModule } from '@/submissions/selection/selection.module.js'
import { InstrumentModule } from '@/festival/instrument/instrument.module.js'
import { TrophyModule } from '@/festival/trophy/trophy.module.js'
import { PaymentModule } from '@/payment/payment.module.js'
import { PrismaModule } from '@/prisma/prisma.module.js'
import { CommunityModule } from '@/submissions/community/community.module.js'
import { CommunityGroupModule } from '@/submissions/community-group/community-group.module.js'
import { GroupModule } from '@/submissions/group/group.module.js'
import { PerformerModule } from '@/submissions/performer/performer.module.js'
import { SchoolModule } from '@/submissions/school/school.module.js'
import { SchoolGroupModule } from '@/submissions/school-group/school-group.module.js'
import { TeacherModule } from '@/submissions/teacher/teacher.module.js'
import { UserModule } from '@/user/user.module.js'
import { ApolloServerPluginUsageReportingDisabled } from '@apollo/server/plugin/disabled'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import metadata from './metadata.js'
import { OrderModule } from './submissions/order/order.module.js'
import { ItemModule } from './festival/item/item.module.js'
import { OrderItemModule } from './submissions/order-item/order-item.module.js'
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
      graphiql: {
        url: '/graphql',
        headers: {
          authorization: 'Bearer <token>',
        },
        shouldPersistHeaders: true,
        isHeadersEditorEnabled: true,
      },
      plugins: [
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
