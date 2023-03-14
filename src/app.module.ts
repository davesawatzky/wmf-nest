import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
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
import { ConfigModule } from '@nestjs/config'
import { AbilityModule } from './ability/ability.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      // typePaths: ['./**/*.graphql'],
      // definitions: {
      //   path: join(process.cwd(), 'src/graphql.ts'),
      // outputAs: 'class',

      playground: false,
      debug: true,
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
  ],
})
export class AppModule {}
