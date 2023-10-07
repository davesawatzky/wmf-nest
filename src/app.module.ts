import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'
import { RegistrationModule } from './submissions/registration/registration.module'
import { FestivalClassModule } from './festival/festival-class/festival-class.module'
import { CategoryModule } from './festival/category/category.module'
import { CommunityModule } from './submissions/community/community.module'
import { DisciplineModule } from './festival/discipline/discipline.module'
import { InstrumentModule } from './festival/instrument/instrument.module'
import { LevelModule } from './festival/level/level.module'
import { PerformerModule } from './submissions/performer/performer.module'
import { GroupModule } from './submissions/group/group.module'
import { SchoolModule } from './submissions/school/school.module'
import { SubdisciplineModule } from './festival/subdiscipline/subdiscipline.module'
import { TrophyModule } from './festival/trophy/trophy.module'
import { RegisteredClassModule } from './submissions/registered-class/registered-class.module'
import { TeacherModule } from './submissions/teacher/teacher.module'
import { SelectionModule } from './submissions/selection/selection.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AbilityModule } from './ability/ability.module'
// import { SubmissionModule } from './submissions/submission/submission.module'
import { SchoolGroupModule } from './submissions/school-group/school-group.module'
import { FieldConfigModule } from './submissions/field-config/field-config.module'
import { StripeModule } from './stripe/stripe.module'
import { CustomersModule } from './customers/customers.module'
import { EmailModule } from './email/email.module'
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module'
import metadata from './metadata'

@Module({
  imports: [
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
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    PrismaModule,
    UserModule,
    RegistrationModule,
    FestivalClassModule,
    CategoryModule,
    CommunityModule,
    DisciplineModule,
    InstrumentModule,
    LevelModule,
    PerformerModule,
    GroupModule,
    SchoolModule,
    SubdisciplineModule,
    TrophyModule,
    RegisteredClassModule,
    TeacherModule,
    SelectionModule,
    AuthModule,
    AbilityModule,
    // SubmissionModule,
    SchoolGroupModule,
    FieldConfigModule,
    StripeModule.forRoot(process.env.STRIPE_SERVER_KEY, {
      apiVersion: '2023-08-16',
    }),
    CustomersModule,
    EmailModule,
    EmailConfirmationModule,
  ],
})
export class AppModule {}
