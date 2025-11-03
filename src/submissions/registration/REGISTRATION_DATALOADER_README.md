# Registration DataLoader Implementation

## Overview

The `RegistrationDataLoader` service implements request-scoped batching for GraphQL field resolvers in the registration resolver to solve the N+1 query problem. This significantly improves performance when fetching registration-related data.

## Problem Solved

### Before DataLoader (N+1 Query Problem)

When fetching multiple registrations with nested field resolvers, the system would execute:
- 1 query to fetch all registrations
- N queries for users (one per registration)
- N queries for performers (one per registration)
- N queries for registered classes (one per registration)
- N queries for groups (one per registration)
- N queries for communities (one per registration)
- N queries for teachers (one per registration if teacherID exists)
- N queries for schools (one per registration)

**Total**: Up to **1 + 7N queries** for N registrations

Example with 50 registrations:
- Without DataLoader: **1 + 7×50 = 351 queries**

### After DataLoader (Batch Loading)

With DataLoader batching:
- 1 query to fetch all registrations
- 1 batched query for all users
- 1 batched query for all performers
- 1 batched query for all registered classes
- 1 batched query for all groups
- 1 batched query for all communities
- 1 batched query for all teachers (if any registrations have teachers)
- 1 batched query for all schools

**Total**: **8 queries** (or 7 if no teachers assigned)

Example with 50 registrations:
- With DataLoader: **8 queries**
- **Query reduction: 351 → 8 queries (98% reduction)**

## Implementation Details

### DataLoader Configuration

```typescript
@Injectable({ scope: Scope.REQUEST })
export class RegistrationDataLoader {
  constructor(private readonly prisma: PrismaService) {}

  readonly userLoader = new DataLoader<number, tbl_user | null>(...)
  readonly performersLoader = new DataLoader<number, tbl_reg_performer[]>(...)
  readonly registeredClassesLoader = new DataLoader<number, tbl_reg_class[]>(...)
  readonly groupLoader = new DataLoader<number, tbl_reg_group | null>(...)
  readonly communityLoader = new DataLoader<number, tbl_reg_community | null>(...)
  readonly teacherLoader = new DataLoader<number, tbl_user | null>(...)
  readonly schoolLoader = new DataLoader<number, tbl_reg_school | null>(...)
}
```

### Key Features

1. **Request-Scoped**: Each GraphQL request gets a fresh DataLoader instance, preventing stale cache issues
2. **Automatic Batching**: DataLoader collects all `.load()` calls within a single tick and batches them
3. **Caching**: Within a single request, multiple loads of the same ID return the cached result
4. **Logging**: All batch queries include timing and result count logging for monitoring

### Batch Query Patterns

#### One-to-Many Relationships (Array Results)
- `performersLoader`: Returns array of performers per registration
- `registeredClassesLoader`: Returns array of registered classes per registration

```typescript
const performerMap = new Map<number, tbl_reg_performer[]>()
performers.forEach((performer) => {
  const existing = performerMap.get(performer.regID) || []
  performerMap.set(performer.regID, [...existing, performer])
})
return registrationIDs.map(id => performerMap.get(id) || [])
```

#### One-to-One Relationships (Single Result)
- `userLoader`: Returns single user by userID
- `groupLoader`: Returns single group per registration (one-to-one)
- `communityLoader`: Returns single community per registration (one-to-one)
- `teacherLoader`: Returns single teacher by teacherID (nullable)
- `schoolLoader`: Returns single school per registration (one-to-one)

```typescript
const userMap = new Map(users.map(user => [user.id, user]))
return userIDs.map(id => userMap.get(id) || null)
```

## Database Schema Mapping

### Registration Relationships
```prisma
model tbl_registration {
  id                Int                 @id
  userID            Int?                // → tbl_user (one-to-one)
  teacherID         Int?                // → tbl_user (one-to-one, nullable)
  performerType     tbl_performer_type
  // ... other fields

  User              tbl_user?           @relation("UserRelation", fields: [userID])
  Teacher           tbl_user?           @relation("TeacherRelation", fields: [teacherID])
  tbl_reg_performer tbl_reg_performer[] // one-to-many via regID
  tbl_reg_class     tbl_reg_class[]     // one-to-many via regID
  tbl_reg_group     tbl_reg_group?      // one-to-one via regID (unique)
  tbl_reg_community tbl_reg_community?  // one-to-one via regID (unique)
  tbl_reg_school    tbl_reg_school?     // one-to-one via regID (unique)
}
```

### Important Field Names
- **Registration relations use `regID`** (not `registrationID`)
- **User/Teacher relations use `userID` and `teacherID`**
- One-to-one relations have `@unique` constraint on `regID`

## Usage in Resolver

### Before (Direct Service Calls)
```typescript
@ResolveField(() => [Performer])
async performers(@Parent() registration: tbl_registration) {
  const { id } = registration
  return await this.performerService.findAll(id, null) // N+1 query
}
```

### After (DataLoader Batching)
```typescript
@ResolveField(() => [Performer])
async performers(@Parent() registration: tbl_registration) {
  if (!registration?.id) return null
  return await this.registrationDataLoader.performersLoader.load(registration.id)
}
```

## Performance Monitoring

Each DataLoader includes comprehensive logging:

```typescript
this.logger.log(`[DataLoader] Batching ${registrationIDs.length} performers queries`)
const start = Date.now()
// ... query execution
const elapsed = Date.now() - start
this.logger.log(`[DataLoader] Fetched ${performers.length} performers in ${elapsed}ms`)
```

### Sample Log Output
```
[RegistrationDataLoader] Batching 50 user queries
[RegistrationDataLoader] Fetched 50 users in 12ms
[RegistrationDataLoader] Batching 50 performers queries
[RegistrationDataLoader] Fetched 123 performers in 15ms
[RegistrationDataLoader] Batching 50 registered classes queries
[RegistrationDataLoader] Fetched 87 registered classes in 18ms
[RegistrationDataLoader] Batching 50 group queries
[RegistrationDataLoader] Fetched 12 groups in 8ms
[RegistrationDataLoader] Batching 50 community queries
[RegistrationDataLoader] Fetched 5 communities in 6ms
[RegistrationDataLoader] Batching 15 teacher queries
[RegistrationDataLoader] Fetched 15 teachers in 9ms
[RegistrationDataLoader] Batching 50 school queries
[RegistrationDataLoader] Fetched 8 schools in 7ms
```

## Benefits

1. **Performance**: 98% reduction in database queries for typical registration lists
2. **Scalability**: Query count stays constant regardless of registration count
3. **Consistency**: All registrations get their data in consistent batches
4. **Monitoring**: Logging enables performance tracking and optimization
5. **Transparency**: Frontend code requires zero changes

## Testing

Test the DataLoader by querying registrations with nested fields:

```graphql
query GetRegistrations {
  registrations {
    id
    label
    performerType
    user {
      id
      firstName
      lastName
    }
    performers {
      id
      firstName
      lastName
    }
    registeredClasses {
      id
      classNumber
      discipline
    }
    group {
      id
      name
    }
    community {
      id
      name
    }
    teacher {
      id
      firstName
      lastName
    }
    school {
      id
      name
    }
  }
}
```

Check logs to verify batching is working correctly.

## Null Handling

- **userLoader**: Returns null if user not found (userID can be null)
- **teacherLoader**: Returns null if teacherID is null or teacher not found
- **groupLoader**: Returns null if registration doesn't have a group (performerType-specific)
- **communityLoader**: Returns null if registration doesn't have a community (performerType-specific)
- **schoolLoader**: Returns null if registration doesn't have a school (performerType-specific)
- **performersLoader**: Returns empty array `[]` if no performers found
- **registeredClassesLoader**: Returns empty array `[]` if no registered classes found

## Relationship to Festival Class DataLoader

This follows the same architectural pattern as `FestivalClassDataLoader`:
- Request-scoped service
- Batch loading for field resolvers
- Comprehensive logging
- Map-based result ordering
- Null handling for optional relationships

## Potential Future Optimizations

1. **Nested DataLoaders**: If performers/registered classes have their own field resolvers (e.g., festival class details), create DataLoaders for those as well
2. **Selection DataLoader**: If querying selections for registered classes becomes an N+1 problem
3. **School/Community Group DataLoaders**: For group details within schools/communities

## Related Files

- `registration.dataloader.ts`: DataLoader service implementation
- `registration.resolver.ts`: Field resolvers using DataLoader
- `registration.module.ts`: Module configuration with DataLoader provider
- `registration.service.ts`: Service for mutation operations (unchanged)
