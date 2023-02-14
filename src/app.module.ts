import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import {
  DateResolver,
  DateTimeResolver,
  DurationResolver,
  TimeResolver,
  EmailAddressResolver,
} from 'graphql-scalars'
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

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      resolvers: {
        Date: DateResolver,
        DateTime: DateTimeResolver,
        Duration: DurationResolver,
        EmailAddress: EmailAddressResolver,
        Time: TimeResolver,
      },
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
  ],
})
export class AppModule {}
