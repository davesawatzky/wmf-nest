/* eslint-disable */
export default async () => {
  const t = {
    ['./common.entity']: await import('./common.entity'),
    ['./submissions/performer/entities/performer.entity']: await import(
      './submissions/performer/entities/performer.entity'
    ),
    ['./submissions/selection/entities/selection.entity']: await import(
      './submissions/selection/entities/selection.entity'
    ),
    ['./submissions/registered-class/entities/registered-class.entity']:
      await import(
        './submissions/registered-class/entities/registered-class.entity'
      ),
    ['./submissions/group/entities/group.entity']: await import(
      './submissions/group/entities/group.entity'
    ),
    ['./submissions/community/entities/community.entity']: await import(
      './submissions/community/entities/community.entity'
    ),
    ['./submissions/school-group/entities/school-group.entity']: await import(
      './submissions/school-group/entities/school-group.entity'
    ),
    ['./submissions/school/entities/school.entity']: await import(
      './submissions/school/entities/school.entity'
    ),
    ['./user/entities/user.entity']: await import(
      './user/entities/user.entity'
    ),
    ['./submissions/registration/entities/registration.entity']: await import(
      './submissions/registration/entities/registration.entity'
    ),
    ['./festival/subdiscipline/entities/subdiscipline.entity']: await import(
      './festival/subdiscipline/entities/subdiscipline.entity'
    ),
    ['./festival/discipline/entities/discipline.entity']: await import(
      './festival/discipline/entities/discipline.entity'
    ),
    ['./festival/festival-class/entities/festival-class.entity']: await import(
      './festival/festival-class/entities/festival-class.entity'
    ),
    ['./festival/level/entities/level.entity']: await import(
      './festival/level/entities/level.entity'
    ),
    ['./festival/category/entities/category.entity']: await import(
      './festival/category/entities/category.entity'
    ),
    ['./festival/trophy/entities/trophy.entity']: await import(
      './festival/trophy/entities/trophy.entity'
    ),
    ['./festival/instrument/entities/instrument.entity']: await import(
      './festival/instrument/entities/instrument.entity'
    ),
    ['./submissions/submission/entities/submission.entity']: await import(
      './submissions/submission/entities/submission.entity'
    ),
    ['./submissions/field-config/entities/field-config.entity']: await import(
      './submissions/field-config/entities/field-config.entity'
    ),
  }
  return {
    '@nestjs/graphql': {
      models: [
        [
          import('./user/dto/user.input'),
          {
            UserInput: {
              staff: { nullable: true, type: () => Boolean },
              admin: { nullable: true, type: () => Boolean },
              firstName: { nullable: true, type: () => String },
              lastName: { nullable: true, type: () => String },
              apartment: { nullable: true, type: () => String },
              streetNumber: { nullable: true, type: () => String },
              streetName: { nullable: true, type: () => String },
              city: { nullable: true, type: () => String },
              province: { nullable: true, type: () => String },
              postalCode: { nullable: true, type: () => String },
              phone: { nullable: true, type: () => String },
            },
          },
        ],
        [
          import('./common.entity'),
          {
            UserError: {
              message: { type: () => String },
              field: { type: () => [String] },
            },
          },
        ],
        [
          import('./submissions/performer/entities/performer.entity'),
          {
            Performer: {
              firstName: { nullable: true, type: () => String },
              lastName: { nullable: true, type: () => String },
              apartment: { nullable: true, type: () => String },
              streetNumber: { nullable: true, type: () => String },
              streetName: { nullable: true, type: () => String },
              city: { nullable: true, type: () => String },
              province: { nullable: true, type: () => String },
              postalCode: { nullable: true, type: () => String },
              phone: { nullable: true, type: () => String },
              email: { nullable: true, type: () => String },
              otherClasses: { nullable: true, type: () => String },
              instrument: { nullable: true, type: () => String },
              level: { nullable: true, type: () => String },
              id: {},
              age: { nullable: true },
            },
            PerformerPayload: {
              userErrors: { type: () => [t['./common.entity'].UserError] },
              performer: {
                nullable: true,
                type: () =>
                  t['./submissions/performer/entities/performer.entity']
                    .Performer,
              },
            },
          },
        ],
        [
          import('./submissions/selection/entities/selection.entity'),
          {
            Selection: {
              title: { nullable: true, type: () => String },
              largerWork: { nullable: true, type: () => String },
              movement: { nullable: true, type: () => String },
              composer: { nullable: true, type: () => String },
              duration: { nullable: true, type: () => String },
              id: {},
            },
            SelectionPayload: {
              userErrors: { type: () => [t['./common.entity'].UserError] },
              selection: {
                nullable: true,
                type: () =>
                  t['./submissions/selection/entities/selection.entity']
                    .Selection,
              },
            },
          },
        ],
        [
          import(
            './submissions/registered-class/entities/registered-class.entity'
          ),
          {
            RegisteredClass: {
              selections: {
                nullable: true,
                type: () => [
                  t['./submissions/selection/entities/selection.entity']
                    .Selection,
                ],
              },
              classNumber: { nullable: true, type: () => String },
              discipline: { nullable: true, type: () => String },
              subdiscipline: { nullable: true, type: () => String },
              level: { nullable: true, type: () => String },
              category: { nullable: true, type: () => String },
              schoolGroupID: { nullable: true, type: () => Number },
              id: {},
              numberOfSelections: { nullable: true },
              minSelections: { nullable: true },
              maxSelections: { nullable: true },
              price: { nullable: true },
            },
            RegisteredClassPayload: {
              userErrors: { type: () => [t['./common.entity'].UserError] },
              registeredClass: {
                nullable: true,
                type: () =>
                  t[
                    './submissions/registered-class/entities/registered-class.entity'
                  ].RegisteredClass,
              },
            },
          },
        ],
        [
          import('./submissions/group/entities/group.entity'),
          {
            Group: {
              name: { nullable: true, type: () => String },
              groupType: { nullable: true, type: () => String },
              instruments: { nullable: true, type: () => String },
              id: {},
              numberOfPerformers: { nullable: true },
              age: { nullable: true },
            },
            GroupPayload: {
              userErrors: {
                nullable: true,
                type: () => [t['./common.entity'].UserError],
              },
              group: {
                nullable: true,
                type: () =>
                  t['./submissions/group/entities/group.entity'].Group,
              },
            },
          },
        ],
        [
          import('./submissions/community/entities/community.entity'),
          {
            Community: {
              name: { nullable: true, type: () => String },
              conflictPerformers: { nullable: true, type: () => String },
              earliestTime: { nullable: true, type: () => String },
              latestTime: { nullable: true, type: () => String },
              unavailable: { nullable: true, type: () => String },
              id: {},
              groupSize: { nullable: true },
              chaperones: { nullable: true },
              wheelchairs: { nullable: true },
            },
            CommunityPayload: {
              userErrors: { type: () => [t['./common.entity'].UserError] },
              community: {
                nullable: true,
                type: () =>
                  t['./submissions/community/entities/community.entity']
                    .Community,
              },
            },
          },
        ],
        [
          import('./submissions/school-group/entities/school-group.entity'),
          {
            SchoolGroup: {
              name: { nullable: true, type: () => String },
              conflictPerformers: { nullable: true, type: () => String },
              earliestTime: { nullable: true, type: () => String },
              latestTime: { nullable: true, type: () => String },
              unavailable: { nullable: true, type: () => String },
              id: {},
              groupSize: { nullable: true },
              chaperones: { nullable: true },
              wheelchairs: { nullable: true },
            },
            SchoolGroupPayload: {
              userErrors: { type: () => [t['./common.entity'].UserError] },
              schoolGroup: {
                nullable: true,
                type: () =>
                  t['./submissions/school-group/entities/school-group.entity']
                    .SchoolGroup,
              },
            },
          },
        ],
        [
          import('./submissions/school/entities/school.entity'),
          {
            School: {
              name: { type: () => String },
              division: { nullable: true, type: () => String },
              streetNumber: { nullable: true, type: () => String },
              streetName: { nullable: true, type: () => String },
              city: { nullable: true, type: () => String },
              province: { nullable: true, type: () => String },
              postalCode: { nullable: true, type: () => String },
              phone: { nullable: true, type: () => String },
              schoolGroups: {
                nullable: true,
                type: () => [
                  t['./submissions/school-group/entities/school-group.entity']
                    .SchoolGroup,
                ],
              },
              id: {},
            },
            SchoolPayload: {
              userErrors: { type: () => [t['./common.entity'].UserError] },
              school: {
                nullable: true,
                type: () =>
                  t['./submissions/school/entities/school.entity'].School,
              },
            },
          },
        ],
        [
          import('./submissions/registration/entities/registration.entity'),
          {
            Registration: {
              label: { nullable: true, type: () => String },
              user: { type: () => t['./user/entities/user.entity'].User },
              performers: {
                nullable: true,
                type: () => [
                  t['./submissions/performer/entities/performer.entity']
                    .Performer,
                ],
              },
              registeredClasses: {
                nullable: true,
                type: () => [
                  t[
                    './submissions/registered-class/entities/registered-class.entity'
                  ].RegisteredClass,
                ],
              },
              group: {
                nullable: true,
                type: () =>
                  t['./submissions/group/entities/group.entity'].Group,
              },
              community: {
                nullable: true,
                type: () =>
                  t['./submissions/community/entities/community.entity']
                    .Community,
              },
              teacher: {
                nullable: true,
                type: () =>
                  t['./submissions/teacher/entities/teacher.entity'].Teacher,
              },
              school: {
                nullable: true,
                type: () =>
                  t['./submissions/school/entities/school.entity'].School,
              },
              transactionInfo: { nullable: true, type: () => String },
              confirmation: { nullable: true, type: () => String },
              submittedAt: { nullable: true, type: () => Date },
              createdAt: { nullable: true, type: () => Date },
              updatedAt: { nullable: true, type: () => Date },
              id: {},
              performerType: {},
              totalAmt: { nullable: true },
              payedAmt: { nullable: true },
            },
            RegistrationPayload: {
              userErrors: {
                nullable: true,
                type: () => [t['./common.entity'].UserError],
              },
              registration: {
                nullable: true,
                type: () =>
                  t['./submissions/registration/entities/registration.entity']
                    .Registration,
              },
            },
          },
        ],
        [
          import('./user/entities/user.entity'),
          {
            User: {
              email: { type: () => String },
              staff: { type: () => Boolean },
              admin: { type: () => Boolean },
              firstName: { nullable: true, type: () => String },
              lastName: { nullable: true, type: () => String },
              apartment: { nullable: true, type: () => String },
              streetNumber: { nullable: true, type: () => String },
              streetName: { nullable: true, type: () => String },
              city: { nullable: true, type: () => String },
              province: { nullable: true, type: () => String },
              postalCode: { nullable: true, type: () => String },
              phone: { nullable: true, type: () => String },
              registrations: {
                nullable: true,
                type: () => [
                  t['./submissions/registration/entities/registration.entity']
                    .Registration,
                ],
              },
              id: {},
            },
            UserPayload: {
              userErrors: { type: () => [t['./common.entity'].UserError] },
              user: {
                nullable: true,
                type: () => t['./user/entities/user.entity'].User,
              },
            },
          },
        ],
        [
          import('./submissions/registration/dto/registration.input'),
          {
            RegistrationInput: {
              confirmation: { nullable: true, type: () => String },
              label: { nullable: true, type: () => String },
              transactionInfo: { nullable: true, type: () => String },
              submittedAt: { nullable: true, type: () => Date },
              performerType: { nullable: true },
              payedAmt: { nullable: true },
              totalAmt: { nullable: true },
            },
          },
        ],
        [
          import('./submissions/performer/dto/performer.input'),
          {
            PerformerInput: {
              firstName: { nullable: true, type: () => String },
              lastName: { nullable: true, type: () => String },
              apartment: { nullable: true, type: () => String },
              streetNumber: { nullable: true, type: () => String },
              streetName: { nullable: true, type: () => String },
              city: { nullable: true, type: () => String },
              province: { nullable: true, type: () => String },
              postalCode: { nullable: true, type: () => String },
              phone: { nullable: true, type: () => String },
              email: { nullable: true, type: () => String },
              otherClasses: { nullable: true, type: () => String },
              instrument: { nullable: true, type: () => String },
              level: { nullable: true, type: () => String },
              age: { nullable: true },
            },
          },
        ],
        [
          import('./submissions/selection/dto/selection.input'),
          {
            SelectionInput: {
              title: { nullable: true, type: () => String },
              largerWork: { nullable: true, type: () => String },
              movement: { nullable: true, type: () => String },
              composer: { nullable: true, type: () => String },
              duration: { nullable: true, type: () => String },
            },
          },
        ],
        [
          import('./submissions/registered-class/dto/registered-class.input'),
          {
            RegisteredClassInput: {
              classNumber: { nullable: true, type: () => String },
              discipline: { nullable: true, type: () => String },
              subdiscipline: { nullable: true, type: () => String },
              level: { nullable: true, type: () => String },
              category: { nullable: true, type: () => String },
              schoolGroupID: { nullable: true, type: () => Number },
              numberOfSelections: { nullable: true },
              minSelections: { nullable: true },
              maxSelections: { nullable: true },
              price: { nullable: true },
            },
          },
        ],
        [
          import('./submissions/group/dto/group.input'),
          {
            GroupInput: {
              name: { nullable: true, type: () => String },
              groupType: { nullable: true, type: () => String },
              instruments: { nullable: true, type: () => String },
              numberOfPerformers: { nullable: true },
              age: { nullable: true },
            },
          },
        ],
        [
          import('./submissions/teacher/dto/teacher.input'),
          {
            TeacherInput: {
              prefix: { nullable: true, type: () => String },
              firstName: { nullable: true, type: () => String },
              lastName: { nullable: true, type: () => String },
              apartment: { nullable: true, type: () => String },
              streetNumber: { nullable: true, type: () => String },
              streetName: { nullable: true, type: () => String },
              city: { nullable: true, type: () => String },
              province: { nullable: true, type: () => String },
              postalCode: { nullable: true, type: () => String },
              phone: { nullable: true, type: () => String },
              email: { nullable: true, type: () => String },
            },
          },
        ],
        [
          import('./submissions/community/dto/community.input'),
          {
            CommunityInput: {
              name: { nullable: true, type: () => String },
              conflictPerformers: { nullable: true, type: () => String },
              earliestTime: { nullable: true, type: () => String },
              latestTime: { nullable: true, type: () => String },
              unavailable: { nullable: true, type: () => String },
              groupSize: { nullable: true },
              chaperones: { nullable: true },
              wheelchairs: { nullable: true },
            },
          },
        ],
        [
          import('./submissions/school/dto/school.input'),
          {
            SchoolInput: {
              name: { nullable: true, type: () => String },
              division: { nullable: true, type: () => String },
              streetNumber: { nullable: true, type: () => String },
              streetName: { nullable: true, type: () => String },
              city: { nullable: true, type: () => String },
              province: { nullable: true, type: () => String },
              postalCode: { nullable: true, type: () => String },
              phone: { nullable: true, type: () => String },
            },
          },
        ],
        [
          import('./submissions/school-group/dto/school-group.input'),
          {
            SchoolGroupInput: {
              name: { nullable: true, type: () => String },
              conflictPerformers: { nullable: true, type: () => String },
              earliestTime: { nullable: true, type: () => String },
              latestTime: { nullable: true, type: () => String },
              unavailable: { nullable: true, type: () => String },
              groupSize: { nullable: true },
              chaperones: { nullable: true },
              wheelchairs: { nullable: true },
            },
          },
        ],
        [
          import('./festival/festival-class/dto/festival-class.input'),
          {
            FestivalClassInput: {
              classNumber: { type: () => String },
              requiredSelection: { nullable: true, type: () => String },
              subdisciplineID: {},
              levelID: {},
              categoryID: {},
              maxSelections: {},
              minSelections: {},
              performerType: {},
              price: { nullable: true },
            },
            FestivalClassSearchArgs: {
              subdisciplineID: { nullable: true },
              levelID: { nullable: true },
              categoryID: { nullable: true },
            },
          },
        ],
        [
          import('./festival/discipline/entities/discipline.entity'),
          {
            Discipline: {
              name: { nullable: true, type: () => String },
              subdisciplines: {
                nullable: true,
                type: () => [
                  t['./festival/subdiscipline/entities/subdiscipline.entity']
                    .Subdiscipline,
                ],
              },
              id: { nullable: true },
            },
            DisciplinePayload: {
              userErrors: { type: () => [t['./common.entity'].UserError] },
              discipline: {
                nullable: true,
                type: () =>
                  t['./festival/discipline/entities/discipline.entity']
                    .Discipline,
              },
            },
          },
        ],
        [
          import('./festival/level/entities/level.entity'),
          {
            Level: {
              name: { type: () => String },
              description: { nullable: true, type: () => String },
              classes: {
                nullable: true,
                type: () => [
                  t['./festival/festival-class/entities/festival-class.entity']
                    .FestivalClass,
                ],
              },
              id: {},
            },
            LevelPayload: {
              userErrors: { type: () => [t['./common.entity'].UserError] },
              level: {
                nullable: true,
                type: () => t['./festival/level/entities/level.entity'].Level,
              },
            },
          },
        ],
        [
          import('./festival/subdiscipline/entities/subdiscipline.entity'),
          {
            Subdiscipline: {
              name: { type: () => String },
              description: { nullable: true, type: () => String },
              maxPerformers: { nullable: true, type: () => Number },
              minPerformers: { nullable: true, type: () => Number },
              levels: {
                nullable: true,
                type: () => [t['./festival/level/entities/level.entity'].Level],
              },
              discipline: {
                nullable: true,
                type: () =>
                  t['./festival/discipline/entities/discipline.entity']
                    .Discipline,
              },
              festivalClasses: {
                nullable: true,
                type: () => [
                  t['./festival/festival-class/entities/festival-class.entity']
                    .FestivalClass,
                ],
              },
              id: {},
              performerType: {},
              price: { nullable: true },
            },
            SubdisciplinePayload: {
              userErrors: { type: () => [t['./common.entity'].UserError] },
              subdiscpline: {
                nullable: true,
                type: () =>
                  t['./festival/subdiscipline/entities/subdiscipline.entity']
                    .Subdiscipline,
              },
            },
          },
        ],
        [
          import('./festival/category/entities/category.entity'),
          {
            Category: {
              name: { type: () => String },
              description: { nullable: true, type: () => String },
              requiredComposer: { nullable: true, type: () => String },
              festivalClasses: {
                nullable: true,
                type: () => [
                  t['./festival/festival-class/entities/festival-class.entity']
                    .FestivalClass,
                ],
              },
              id: {},
            },
            CategoryPayload: {
              userErrors: { type: () => [t['./common.entity'].UserError] },
              category: {
                nullable: true,
                type: () =>
                  t['./festival/category/entities/category.entity'].Category,
              },
            },
          },
        ],
        [
          import('./festival/trophy/entities/trophy.entity'),
          {
            Trophy: {
              name: { type: () => String },
              description: { nullable: true, type: () => String },
              festivalClasses: {
                nullable: true,
                type: () => [
                  t['./festival/festival-class/entities/festival-class.entity']
                    .FestivalClass,
                ],
              },
              id: {},
            },
            TrophyPayload: {
              userErrors: { type: () => [t['./common.entity'].UserError] },
              trophy: {
                nullable: true,
                type: () =>
                  t['./festival/trophy/entities/trophy.entity'].Trophy,
              },
            },
          },
        ],
        [
          import('./festival/festival-class/entities/festival-class.entity'),
          {
            FestivalClass: {
              classNumber: { type: () => String },
              subdiscipline: {
                type: () =>
                  t['./festival/subdiscipline/entities/subdiscipline.entity']
                    .Subdiscipline,
              },
              level: {
                type: () => t['./festival/level/entities/level.entity'].Level,
              },
              category: {
                type: () =>
                  t['./festival/category/entities/category.entity'].Category,
              },
              requiredSelection: { nullable: true, type: () => String },
              trophies: {
                nullable: true,
                type: () => [
                  t['./festival/trophy/entities/trophy.entity'].Trophy,
                ],
              },
              id: {},
              maxSelections: {},
              minSelections: {},
              performerType: {},
              price: { nullable: true },
            },
            FestivalClassPayload: {
              userErrors: { type: () => [t['./common.entity'].UserError] },
              festivalClass: {
                nullable: true,
                type: () =>
                  t['./festival/festival-class/entities/festival-class.entity']
                    .FestivalClass,
              },
            },
          },
        ],
        [
          import('./festival/subdiscipline/dto/subdiscipline.input'),
          {
            SubdisciplineInput: {
              name: { type: () => String },
              description: { nullable: true, type: () => String },
              maxPerformers: { nullable: true, type: () => Number },
              minPerformers: { nullable: true, type: () => Number },
              performerType: {},
              price: { nullable: true },
            },
          },
        ],
        [
          import('./festival/level/dto/level.input'),
          {
            LevelInput: {
              name: { type: () => String },
              description: { nullable: true, type: () => String },
            },
          },
        ],
        [
          import('./festival/category/dto/category.input'),
          {
            CategoryInput: {
              name: { type: () => String },
              description: { nullable: true, type: () => String },
              requiredComposer: { nullable: true, type: () => String },
            },
          },
        ],
        [
          import('./festival/discipline/dto/discipline.input'),
          { DisciplineInput: { name: { type: () => String } } },
        ],
        [
          import('./festival/instrument/entities/instrument.entity'),
          {
            Instrument: { name: { type: () => String }, id: {} },
            InstrumentPayload: {
              userErrors: { type: () => [t['./common.entity'].UserError] },
              instrument: {
                nullable: true,
                type: () =>
                  t['./festival/instrument/entities/instrument.entity']
                    .Instrument,
              },
            },
          },
        ],
        [
          import('./festival/instrument/dto/instrument.input'),
          { InstrumentInput: { name: { nullable: true, type: () => String } } },
        ],
        [
          import('./festival/trophy/dto/trophy.input'),
          {
            TrophyInput: {
              name: { type: () => String },
              description: { nullable: true, type: () => String },
            },
          },
        ],
        [
          import('./auth/dto/auth.entity'),
          {
            AuthPayload: {
              userErrors: { type: () => [t['./common.entity'].UserError] },
              diatonicToken: { nullable: true, type: () => String },
              user: {},
            },
          },
        ],
        [
          import('./auth/dto/credentials-signup.input'),
          {
            CredentialsSignup: {
              firstName: { type: () => String },
              lastName: { type: () => String },
              email: { type: () => String },
              password: { type: () => String },
            },
          },
        ],
        [
          import('./auth/dto/credentials-signin.input'),
          {
            CredentialsSignin: {
              email: { type: () => String },
              password: { type: () => String },
            },
          },
        ],
        [
          import('./submissions/submission/entities/submission.entity'),
          {
            Submission: {
              confirmation: { type: () => String },
              submittedAt: {},
              payedAmt: { nullable: true },
            },
            SubmissionPayload: {
              userErrors: {
                nullable: true,
                type: () => [t['./common.entity'].UserError],
              },
              submission: {
                nullable: true,
                type: () =>
                  t['./submissions/submission/entities/submission.entity']
                    .Submission,
              },
            },
          },
        ],
        [
          import('./submissions/field-config/dto/field-config.input'),
          {
            FieldConfigInput: {
              tableName: { nullable: true, type: () => String },
              fieldName: { nullable: true, type: () => String },
              submissionRequired: { nullable: true, type: () => Boolean },
              communityRequired: { nullable: true, type: () => Boolean },
              groupRequired: { nullable: true, type: () => Boolean },
              schoolRequired: { nullable: true, type: () => Boolean },
              soloRequired: { nullable: true, type: () => Boolean },
              customField: { nullable: true, type: () => Boolean },
              customFieldType: { nullable: true, type: () => String },
            },
          },
        ],
        [
          import('./submissions/field-config/entities/field-config.entity'),
          {
            FieldConfig: {
              tableName: { type: () => String },
              fieldName: { type: () => String },
              submissionRequired: { type: () => Boolean },
              communityRequired: { type: () => Boolean },
              groupRequired: { type: () => Boolean },
              schoolRequired: { type: () => Boolean },
              soloRequired: { type: () => Boolean },
              customField: { type: () => Boolean },
              customFieldType: { nullable: true, type: () => String },
              id: {},
            },
            FieldConfigPayload: {
              userErrors: {
                nullable: true,
                type: () => [t['./common.entity'].UserError],
              },
              fieldConfig: {
                nullable: true,
                type: () =>
                  t['./submissions/field-config/entities/field-config.entity']
                    .FieldConfig,
              },
            },
          },
        ],
        [
          import('./submissions/submission/dto/submission.input'),
          {
            SubmissionInput: {
              confirmation: { type: () => String },
              submittedAt: {},
              payedAmt: { nullable: true },
            },
          },
        ],
      ],
    },
  }
}
