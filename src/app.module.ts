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
import { RegistrationModule } from './registration/registration.module'
import { FestivalClassModule } from './festival-class/festival-class.module'
import { CategoryModule } from './category/category.module'
import { CommunityModule } from './community/community.module'
import { DisciplineModule } from './discipline/discipline.module'
import { InstrumentModule } from './instrument/instrument.module'
import { LevelModule } from './level/level.module'
import { PerformerModule } from './performer/performer.module'
import { GroupModule } from './group/group.module'
import { SchoolModule } from './school/school.module'
import { SubdisciplineModule } from './subdiscipline/subdiscipline.module'
import { TrophyModule } from './trophy/trophy.module'
import { RegisteredClassModule } from './registered-class/registered-class.module'
import { TeacherModule } from './teacher/teacher.module'
import { SelectionModule } from './selection/selection.module'

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
