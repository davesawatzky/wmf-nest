# Winnipeg Music Festival NestJS Backend - AI Agent Instructions

## Project Overview
This is a NestJS GraphQL backend for the Winnipeg Music Festival registration system, integrated with a PostgreSQL database via Prisma ORM. The system manages festival classes, performer registrations, communities, schools, and payments through Stripe.

## Architecture Patterns

### Error Handling & Logging
**CRITICAL**: Follow the established error handling pattern consistently across all services:

```typescript
// Read operations: Throw NestJS exceptions
async findOne(id: number) {
  if (!id) throw new BadRequestException('ID is required')
  
  try {
    const result = await this.prisma.model.findUnique({ where: { id } })
    if (!result) throw new NotFoundException('Record not found')
    
    this.logger.log(`Successfully retrieved record ID: ${id}`)
    return result
  } catch (error: any) {
    if (error instanceof BadRequestException || error instanceof NotFoundException) throw error
    
    this.logger.error(`Failed to retrieve record ID ${id}: ${error.message}`, error.stack)
    throw new InternalServerErrorException('Failed to retrieve record')
  }
}

// Mutation operations: Return GraphQL payload objects
async create(input: CreateInput) {
  let record: Model
  let userErrors: UserError[]
  
  try {
    userErrors = []
    record = await this.prisma.model.create({ data: input })
    this.logger.log(`Successfully created record ID: ${record.id}`)
  } catch (error: any) {
    this.logger.error(`Failed to create record: ${error.message}`, error.stack)
    
    if (error.code === 'P2002') {
      userErrors = [{ message: 'Record already exists', field: ['name'] }]
      record = null
    } else {
      userErrors = [{ message: 'Cannot create record', field: [] }]
      record = null
    }
  }
  
  return { userErrors, record }
}
```

- **Every service class**: Must have `private readonly logger = new Logger(ServiceName.name)`
- **Read operations**: Throw `BadRequestException`, `NotFoundException`, or `InternalServerErrorException`
- **Mutations**: Return `{ userErrors: UserError[], record: Model | null }` payload objects
- **Prisma errors**: Handle P2002 (uniqueness), P2003 (foreign key), P2025 (not found)
- **Logging**: Use structured logging with appropriate levels (debug, log, warn, error)

### GraphQL Entity Pattern
All entities follow this pattern:
```typescript
@ObjectType()
export class EntityPayload {
  userErrors: UserError[]
  entity?: Entity
}
```

### Authorization with CASL
Uses role-based permissions with CASL abilities:
```typescript
@UseGuards(JwtAuthGuard, AbilitiesGuard)
@CheckAbilities({ action: Action.Read, subject: Entity })
```
- **Roles**: `admin` (full access), `user` (limited access)
- **Actions**: `Manage`, `Create`, `Read`, `Update`, `Delete`
- **All resolvers**: Must use `@UseGuards(JwtAuthGuard)` at class level

### DataLoader Pattern for N+1 Query Optimization
**CRITICAL**: Use DataLoader to prevent N+1 query problems in GraphQL field resolvers. The application implements request-scoped batch loading for all complex entity relationships.

#### DataLoader Architecture
**Core Principles**:
- **Request-scoped**: Each GraphQL request gets fresh DataLoader instances (`Scope.REQUEST`)
- **Batching**: Collects multiple `load()` calls within a single tick and executes one batch query
- **Caching**: Within a request, identical keys return cached results
- **Ordering**: Results must be returned in the same order as input IDs (use Map-based ordering)

#### Standard DataLoader Service Pattern
```typescript
import { Injectable, Logger, Scope } from '@nestjs/common'
import DataLoader from 'dataloader'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable({ scope: Scope.REQUEST })
export class EntityDataLoader {
  private readonly logger = new Logger(EntityDataLoader.name)

  constructor(private readonly prisma: PrismaService) {}

  // Simple one-to-one relationship loader
  public readonly relatedEntityLoader = new DataLoader<number, RelatedEntity | null>(
    async (ids: readonly number[]) => {
      const startTime = performance.now()
      this.logger.debug(`Batching ${ids.length} relatedEntity queries`)

      const entities = await this.prisma.tbl_related_entity.findMany({
        where: { id: { in: [...ids] } },
      })

      // Map-based ordering: CRITICAL for correct result alignment
      const entityMap = new Map(entities.map(entity => [entity.id, entity]))
      const orderedResults = ids.map(id => entityMap.get(id) ?? null)

      this.logger.log(
        `Fetched ${orderedResults.length} related entities in ${(performance.now() - startTime).toFixed(2)}ms`
      )
      return orderedResults
    }
  )

  // Many-to-many relationship via direct foreign key array
  public readonly childrenLoader = new DataLoader<number, ChildEntity[]>(
    async (parentIds: readonly number[]) => {
      const startTime = performance.now()
      this.logger.debug(`Batching ${parentIds.length} children queries`)

      const children = await this.prisma.tbl_child.findMany({
        where: { parentId: { in: [...parentIds] } },
      })

      // Group by parent ID
      const childrenByParent = new Map<number, ChildEntity[]>()
      for (const child of children) {
        const existing = childrenByParent.get(child.parentId) || []
        existing.push(child)
        childrenByParent.set(child.parentId, existing)
      }

      const orderedResults = parentIds.map(id => childrenByParent.get(id) ?? [])

      this.logger.log(
        `Fetched children for ${parentIds.length} parents in ${(performance.now() - startTime).toFixed(2)}ms`
      )
      return orderedResults
    }
  )

  // Indirect many-to-many via junction table (two-step query pattern)
  public readonly associatedEntitiesLoader = new DataLoader<number, AssociatedEntity[]>(
    async (entityIds: readonly number[]) => {
      const startTime = performance.now()
      this.logger.debug(`Batching ${entityIds.length} associated entity queries`)

      // Step 1: Get junction table records
      const junctionRecords = await this.prisma.tbl_junction.findMany({
        where: { entityId: { in: [...entityIds] } },
        select: { entityId: true, associatedId: true },
      })

      // Step 2: Get unique associated IDs
      const associatedIds = [...new Set(junctionRecords.map(j => j.associatedId))]
      
      // Step 3: Fetch associated entities
      const associatedEntities = await this.prisma.tbl_associated.findMany({
        where: { id: { in: associatedIds } },
      })

      // Step 4: Map entities by ID for fast lookup
      const entityMap = new Map(associatedEntities.map(e => [e.id, e]))

      // Step 5: Group by original entity ID and deduplicate
      const entitiesByParent = new Map<number, AssociatedEntity[]>()
      for (const junction of junctionRecords) {
        const entity = entityMap.get(junction.associatedId)
        if (entity) {
          const existing = entitiesByParent.get(junction.entityId) || []
          // Deduplicate: check if entity already exists
          if (!existing.find(e => e.id === entity.id)) {
            existing.push(entity)
          }
          entitiesByParent.set(junction.entityId, existing)
        }
      }

      const orderedResults = entityIds.map(id => entitiesByParent.get(id) ?? [])

      this.logger.log(
        `Fetched associated entities for ${entityIds.length} entities in ${(performance.now() - startTime).toFixed(2)}ms`
      )
      return orderedResults
    }
  )
}
```

#### DataLoader Integration Patterns

**1. Module Configuration**:
```typescript
@Module({
  providers: [
    EntityService,
    EntityResolver,
    EntityDataLoader, // Add DataLoader as request-scoped provider
  ],
  exports: [EntityService],
})
export class EntityModule {}
```

**2. Resolver Integration**:
```typescript
@Resolver(() => Entity)
@UseGuards(JwtAuthGuard)
export class EntityResolver {
  constructor(
    private readonly entityService: EntityService,
    private readonly entityDataLoader: EntityDataLoader, // Inject DataLoader
  ) {}

  // Standard query - use service
  @Query(() => [Entity])
  @CheckAbilities({ action: Action.Read, subject: Entity })
  async entities() {
    return await this.entityService.findAll()
  }

  // Field resolver - use DataLoader
  @ResolveField(() => RelatedEntity, { nullable: true })
  async relatedEntity(@Parent() entity: Entity) {
    if (!entity.relatedEntityId) return null
    return await this.entityDataLoader.relatedEntityLoader.load(entity.relatedEntityId)
  }

  // Field resolver for array - use DataLoader
  @ResolveField(() => [ChildEntity])
  async children(@Parent() entity: Entity) {
    return await this.entityDataLoader.childrenLoader.load(entity.id)
  }

  // Field resolver for many-to-many - use DataLoader
  @ResolveField(() => [AssociatedEntity])
  async associatedEntities(@Parent() entity: Entity) {
    return await this.entityDataLoader.associatedEntitiesLoader.load(entity.id)
  }
}
```

**3. Remove Service Dependencies**:
When implementing DataLoader, remove service dependencies that were only used for field resolution:
```typescript
// BEFORE (N+1 problem)
constructor(
  private readonly entityService: EntityService,
  private readonly relatedEntityService: RelatedEntityService, // ❌ Only used in field resolver
) {}

@ResolveField(() => RelatedEntity)
async relatedEntity(@Parent() entity: Entity) {
  return await this.relatedEntityService.findOne(entity.relatedEntityId) // ❌ N+1 queries
}

// AFTER (batched)
constructor(
  private readonly entityService: EntityService,
  private readonly entityDataLoader: EntityDataLoader, // ✅ Batch loading
) {}

@ResolveField(() => RelatedEntity)
async relatedEntity(@Parent() entity: Entity) {
  return await this.entityDataLoader.relatedEntityLoader.load(entity.relatedEntityId) // ✅ Batched
}
```

#### Relationship Type Patterns

**Simple One-to-One** (e.g., Instrument → Discipline):
```typescript
// Direct foreign key relationship
public readonly disciplineLoader = new DataLoader<number, Discipline | null>(
  async (disciplineIds: readonly number[]) => {
    const disciplines = await this.prisma.tbl_discipline.findMany({
      where: { id: { in: [...disciplineIds] } },
    })
    const disciplineMap = new Map(disciplines.map(d => [d.id, d]))
    return disciplineIds.map(id => disciplineMap.get(id) ?? null)
  }
)
```

**One-to-Many** (e.g., FestivalClass → Selections):
```typescript
// Parent has multiple children via foreign key
public readonly selectionsLoader = new DataLoader<number, Selection[]>(
  async (classIds: readonly number[]) => {
    const selections = await this.prisma.tbl_reg_selection.findMany({
      where: { classId: { in: [...classIds] } },
    })
    const selectionsByClass = new Map<number, Selection[]>()
    for (const selection of selections) {
      const existing = selectionsByClass.get(selection.classId) || []
      existing.push(selection)
      selectionsByClass.set(selection.classId, existing)
    }
    return classIds.map(id => selectionsByClass.get(id) ?? [])
  }
)
```

**Direct Many-to-Many via Junction Table** (e.g., FestivalClass → Trophies):
```typescript
// Junction table with both IDs directly
public readonly trophiesLoader = new DataLoader<number, Trophy[]>(
  async (classIds: readonly number[]) => {
    // Get junction records
    const junctions = await this.prisma.tbl_class_trophy.findMany({
      where: { classId: { in: [...classIds] } },
      select: { classId: true, trophyId: true },
    })
    
    // Get unique trophy IDs
    const trophyIds = [...new Set(junctions.map(j => j.trophyId))]
    
    // Fetch trophies
    const trophies = await this.prisma.tbl_trophy.findMany({
      where: { id: { in: trophyIds } },
    })
    
    // Map and group
    const trophyMap = new Map(trophies.map(t => [t.id, t]))
    const trophiesByClass = new Map<number, Trophy[]>()
    
    for (const junction of junctions) {
      const trophy = trophyMap.get(junction.trophyId)
      if (trophy) {
        const existing = trophiesByClass.get(junction.classId) || []
        existing.push(trophy)
        trophiesByClass.set(junction.classId, existing)
      }
    }
    
    return classIds.map(id => trophiesByClass.get(id) ?? [])
  }
)
```

**Indirect Many-to-Many via Junction Entity** (e.g., Subdiscipline → Categories):
```typescript
// Entities related through intermediate entity (not direct junction table)
// Example: Subdiscipline → FestivalClass → Category
public readonly categoriesLoader = new DataLoader<number, Category[]>(
  async (subdisciplineIds: readonly number[]) => {
    // Step 1: Get junction records (festival classes link subdisciplines to categories)
    const festivalClasses = await this.prisma.tbl_classlist.findMany({
      where: { subdisciplineID: { in: [...subdisciplineIds] } },
      select: { subdisciplineID: true, categoryID: true },
    })
    
    // Step 2: Get unique category IDs
    const categoryIds = [...new Set(festivalClasses.map(fc => fc.categoryID))]
    
    // Step 3: Fetch categories
    const categories = await this.prisma.tbl_category.findMany({
      where: { id: { in: categoryIds } },
    })
    
    // Step 4: Map and group with deduplication
    const categoryMap = new Map(categories.map(c => [c.id, c]))
    const categoriesBySubdiscipline = new Map<number, Category[]>()
    
    for (const fc of festivalClasses) {
      const category = categoryMap.get(fc.categoryID)
      if (category) {
        const existing = categoriesBySubdiscipline.get(fc.subdisciplineID) || []
        // Deduplicate: multiple classes may share same category
        if (!existing.find(c => c.id === category.id)) {
          existing.push(category)
        }
        categoriesBySubdiscipline.set(fc.subdisciplineID, existing)
      }
    }
    
    return subdisciplineIds.map(id => categoriesBySubdiscipline.get(id) ?? [])
  }
)
```

#### Performance Metrics

**Implemented DataLoaders**:

1. **FestivalClass** (5 loaders):
   - `subdisciplineLoader`, `levelLoader`, `categoryLoader`, `classTypeLoader`, `trophiesLoader`
   - Performance: 98% query reduction (251 → 6 queries for 50 classes)

2. **Registration** (7 loaders):
   - `performersLoader`, `groupLoader`, `schoolLoader`, `communityLoader`, `registeredClassesLoader`, `teacherLoader`, `userLoader`
   - Performance: 98% query reduction (351 → 8 queries)

3. **Subdiscipline** (3 loaders):
   - `disciplineLoader`, `categoriesLoader`, `levelsLoader`
   - Performance: 90% query reduction (61 → 6 queries)
   - Special case: Indirect many-to-many via `tbl_classlist` junction entity

4. **Instrument** (1 loader):
   - `disciplineLoader`
   - Performance: 96% query reduction (51 → 2 queries for 50 instruments)

#### DataLoader Best Practices

**DO**:
- ✅ Use `Scope.REQUEST` for all DataLoader services
- ✅ Include comprehensive logging (batch size on entry, result count and duration on completion)
- ✅ Use Map-based ordering to ensure results match input ID order
- ✅ Handle null cases gracefully (`?? null` for single entities, `?? []` for arrays)
- ✅ Deduplicate results for indirect many-to-many relationships
- ✅ Use two-step queries for junction table relationships (more efficient than includes)
- ✅ Spread readonly arrays into mutable arrays (`[...ids]`) for Prisma queries
- ✅ Remove service dependencies that are only used for field resolution

**DON'T**:
- ❌ Don't use DataLoader for top-level queries (only field resolvers)
- ❌ Don't call service methods from field resolvers (causes N+1 problems)
- ❌ Don't forget to deduplicate when multiple junction records point to same entity
- ❌ Don't return results in arbitrary order (must match input ID order)
- ❌ Don't use `include` in DataLoader queries (fetch separately for better batching)
- ❌ Don't inject multiple service dependencies when DataLoader can handle field resolution

#### When to Implement DataLoader

**Implement DataLoader when**:
- Entity has GraphQL field resolvers that fetch related data
- Relationship involves foreign keys to other tables
- Field resolver calls another service's `findOne()` or `findMany()` method
- Lists of entities are commonly queried (e.g., festival classes, registrations)
- N+1 query problems are evident in logs or performance monitoring

**Skip DataLoader when**:
- Entity has no field resolvers
- All data is fetched in the main query (no separate field resolution)
- Entity is rarely queried in lists
- Relationships are simple scalar values (IDs only, no entity fetching)

#### Logging and Monitoring

**Standard logging pattern**:
```typescript
const startTime = performance.now()
this.logger.debug(`Batching ${ids.length} entity queries`)

// ... fetch logic ...

this.logger.log(
  `Fetched ${results.length} entities in ${(performance.now() - startTime).toFixed(2)}ms`
)
```

**What to monitor**:
- Batch sizes: Should be > 1 for effective batching
- Query duration: Should scale sublinearly with batch size
- Result counts: Verify correct entity fetching
- Memory usage: Watch for heap pressure with large batches

**Troubleshooting**:
- **Batch size always 1**: Check if DataLoader is request-scoped (Scope.REQUEST)
- **Wrong results returned**: Verify Map-based ordering matches input ID order
- **Missing results**: Check null handling and deduplication logic
- **Slow queries**: Ensure database indexes on foreign keys
- **Memory issues**: Configure Node.js heap size (`NODE_OPTIONS='--max-old-space-size=4096'`)

### Festival Domain Logic
**CRITICAL**: The system manages a complex music festival with hierarchical class organization and multi-type performer registrations.

#### Core Festival Hierarchy
**Festival classes are organized in a strict 4-level hierarchy**:

1. **Discipline** → `tbl_discipline`
   - Top-level musical categories (e.g., Piano, Voice, Strings)
   - Contains multiple subdisciplines and instruments
   - Filters available classes by performer type and instrument

2. **Subdiscipline** → `tbl_subdiscipline` 
   - Specific areas within disciplines (e.g., Classical Piano, Folk Guitar)
   - Links to categories, levels, and disciplines
   - Contains pricing and performer limits (`minPerformers`, `maxPerformers`)

3. **Level** → `tbl_level`
   - Skill/grade classifications (e.g., Beginner, Grade 1-10, Advanced)
   - Cross-cuts multiple subdisciplines and categories
   - Determines difficulty and age-appropriate groupings

4. **Category** → `tbl_category`
   - Competition types within levels (e.g., Solo, Duet, Own Choice, Set Piece)
   - May specify `requiredComposer` for historical/themed categories
   - Links to multiple levels and subdisciplines

#### Festival Class Entity (`tbl_classlist`)
**Central competition unit** containing:
- `classNumber`: Unique identifier (e.g., "A101", "P342")
- `description`: Human-readable class description
- `performerType`: SOLO | GROUP | SCHOOL | COMMUNITY (enum constraint)
- `price`: Entry fee in dollars
- `minSelections` / `maxSelections`: Required number of pieces to perform
- `requiredSelection`: Mandatory piece if specified
- **Relationships**: Links to subdiscipline, level, category, classType, and trophies

#### Performer Type System
**Four distinct registration workflows**:

1. **SOLO** (`PerformerType.SOLO`)
   - Individual performers with personal details
   - Links to single performer record
   - Most common registration type

2. **GROUP** (`PerformerType.GROUP`)
   - Small ensembles (2-8 performers typically)
   - Links to group entity with multiple performer records
   - Shared contact information

3. **SCHOOL** (`PerformerType.SCHOOL`)
   - School-based performances (choirs, bands, orchestras)
   - Links to school entity with administrative details
   - May have multiple school groups within one registration
   - Contains school division and address information

4. **COMMUNITY** (`PerformerType.COMMUNITY`)
   - Community organizations and adult groups
   - Links to community entity with organization details
   - Similar structure to school but for non-educational groups

#### Registration Workflow
**Multi-step registration process**:

1. **Registration Creation** (`tbl_registration`)
   - User creates registration with chosen `performerType`
   - Generates unique registration ID
   - Sets label for identification

2. **Performer Information** (`tbl_reg_performer`)
   - Add performer details (name, age, contact, etc.)
   - Links to registration ID
   - One-to-many relationship for GROUP types

3. **Class Registration** (`tbl_reg_class`)
   - Register for specific festival classes
   - Links registration to `tbl_classlist` entries
   - Contains class details snapshot for historical preservation

4. **Selection Submission** (`tbl_reg_selection`)
   - Submit specific pieces/songs for each registered class
   - Must meet min/max selection requirements
   - Links to registered class ID

5. **Submission Finalization**
   - Complete registration with confirmation
   - Payment processing through Stripe integration
   - Generate confirmation number

#### Trophy and Award System
**Trophy entities** (`tbl_trophy`):
- Link to multiple festival classes through `tbl_class_trophy` junction table
- Classes can have multiple associated trophies
- Awards given based on performance and class placement

#### Class Type Classifications (`tbl_class_type`)
**Competition formats**:
- Solo performance, ensemble, own choice, set piece
- Determines performance requirements and judging criteria

#### Instruments and Specializations (`tbl_instrument`)
- Links to disciplines for instrument-specific classes
- Enables filtering of relevant classes by instrument
- Supports multi-instrument performers

#### Field Configuration System (`tbl_field_config`)
**Dynamic form requirements** based on performer type:
- Different required fields for SOLO vs GROUP vs SCHOOL vs COMMUNITY
- Configurable validation rules per registration type
- Enables flexible registration requirements

#### Business Rules and Constraints
**Critical validation patterns**:

1. **Class Eligibility**: Performers must meet age/skill requirements for selected classes
2. **Selection Requirements**: Must submit between minSelections and maxSelections pieces
3. **Performer Type Consistency**: All classes in a registration must match the performerType
4. **Price Calculation**: Registration totals based on selected classes and fees
5. **Teacher Requirements**: Some performer types require teacher assignment
6. **School/Community Groups**: May register multiple groups under one registration

#### Domain Service Patterns
**Festival services implement complex filtering**:
```typescript
// Example: Finding classes by multiple criteria
async findAll(
  performerType?: PerformerType,
  subdisciplineID?: number,
  levelID?: number, 
  categoryID?: number
) {
  // Complex where clause building for hierarchical filtering
}
```

**GraphQL field resolvers enable deep navigation**:
- FestivalClass → subdiscipline → discipline → instruments
- Registration → performers → selections → registeredClasses
- School → schoolGroups → performers
- Level → categories → subdisciplines → festivalClasses

#### Data Integrity Patterns
**Referential integrity**:
- Cascade deletes for dependent records
- Foreign key constraints across all relationships
- Unique constraints on critical identifiers (classNumber, etc.)

**Audit trails**:
- CreatedAt/UpdatedAt timestamps on core entities
- Confirmation tracking for submitted registrations
- Payment status and transaction information

## Development Workflows

### Database Management
```bash
# Development migrations
pnpm migrate:dev

# Seed database
pnpm seed:dev

# Generate Prisma client
pnpm prisma:generate
```

### Testing Architecture
**CRITICAL**: The project uses Vitest for both unit and E2E testing with sophisticated test setup infrastructure.

#### Testing Framework Configuration
**Vitest Configuration**:
- **Unit Tests**: `vitest.config.mts` - Standard Vitest setup with SWC transformation
- **E2E Tests**: `vitest.config.e2e.mts` - Integration testing with global setup and shared state
- **TypeScript Paths**: Both configs use `tsconfigPaths()` plugin for `@/` imports
- **SWC Compilation**: `unplugin-swc` for fast TypeScript compilation

#### E2E Testing Infrastructure
**Global Test Setup** (`src/test/globalSetup_e2e.ts`):
```typescript
// Creates test admin user before all tests
export async function setup(): Promise<void> {
  const authService = moduleRef.get<AuthService>(AuthService)
  await authService.signup(TestAdmin())
  await prismaService.tbl_user.update({
    where: { email: TestAdmin().email },
    data: { emailConfirmed: true, roles: ['admin'] }
  })
}
```

**Integration Test Setup** (`src/test/integrationTestAdminSetup.ts`):
- Creates NestJS application with full middleware stack
- Mocks `EmailConfirmationService` to prevent actual email sending
- Configures Helmet, CORS, ValidationPipe, and cookie parser
- Signs in test admin and stores authentication token globally
- Sets up `globalThis` with shared resources:
  - `globalThis.httpServer`: HTTP server instance
  - `globalThis.prisma`: Prisma database client
  - `globalThis.diatonicToken`: Authentication token
  - `globalThis.userId`: Test user ID
  - `globalThis.admin`: Admin role flag

#### E2E Test Patterns
**CRITICAL**: All E2E tests MUST use the `testWithBothRoles` pattern to ensure proper authorization testing.

**Test Helper Functions** (`src/test/testHelpers.ts`):
```typescript
// Available test helpers
export type UserRole = 'admin' | 'user' | 'privateTeacher' | 'schoolTeacher'

export function getAuthToken(role: UserRole): string
export function getUserId(role: UserRole): number
export function createAuthenticatedRequest<T>(role: UserRole): SuperTestGraphQL<T>
export async function testWithBothRoles<T>(
  testName: string,
  testFn: (role: UserRole, token: string, userId: number) => Promise<T>
): Promise<{ admin: T, user: T }>
export async function expectAuthorized<T>(role: UserRole, operation: () => Promise<T>): Promise<T>
export async function expectUnauthorized(role: UserRole, operation: () => Promise<any>): Promise<void>
```

**Standard E2E Test Structure with testWithBothRoles**:
```typescript
import gql from 'graphql-tag'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import {
  createAuthenticatedRequest,
  testWithBothRoles,
} from '@/test/testHelpers'
import {
  Entity,
  EntityPayload,
} from '../entities/entity.entity'

describe('Entity E2E Tests', () => {
  let testEntityId: number

  beforeAll(async () => {
    // Wait for test context to be available
    if (!globalThis.testContext) {
      throw new Error('Test context not initialized. Check integrationTestSetup.')
    }

    // Clean up any existing test data
    await globalThis.prisma.tbl_entity.deleteMany({
      where: { name: { startsWith: 'test_' } },
    })
  }, 30000) // 30 second timeout for setup

  afterAll(async () => {
    // Final cleanup
    await globalThis.prisma.tbl_entity.deleteMany({
      where: { name: { startsWith: 'test_' } },
    })
  })

  describe('Entity Queries (Both Roles)', () => {
    it('Should list all entities for both roles', async () => {
      const results = await testWithBothRoles(
        'list entities',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetEntities {
                entities {
                  id
                  name
                }
              }
            `)
            .expectNoErrors() as { data: { entities: Entity[] } }

          return {
            hasData: !!response.data.entities,
            count: response.data.entities?.length || 0,
          }
        },
      )

      // Both roles should successfully retrieve entities
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThan(0)
      expect(results.user.count).toBe(results.admin.count)
    })
  })

  describe('Entity Mutations', () => {
    it('Should enforce create authorization: admin succeeds, user fails', async () => {
      const results = await testWithBothRoles(
        'create entity',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateEntity($entityInput: EntityInput!) {
                entityCreate(entityInput: $entityInput) {
                  userErrors {
                    message
                    field
                  }
                  entity {
                    id
                    name
                  }
                }
              }
            `, {
              entityInput: { name: `test_${role}_entity` },
            }) as { data?: { entityCreate: EntityPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            entity: response.data?.entityCreate?.entity as Entity | undefined,
            userErrors: response.data?.entityCreate?.userErrors,
          }
        },
      )

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.entity).toBeTruthy()
      expect(results.admin.userErrors).toHaveLength(0)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.entity).toBeUndefined()
    })
  })
})
```

**Test Data Management**:
- **Setup**: Use `beforeAll` for persistent test data, `beforeEach` for per-test data
- **Cleanup**: Use `afterAll` for final cleanup, `afterEach` for per-test cleanup
- **Database Access**: Direct Prisma access via `globalThis.prisma`
- **Authentication**: Use `createAuthenticatedRequest(role)` helper
- **Test Context**: Access via `globalThis.testContext` with admin/user tokens and IDs

#### Unit Testing Patterns
**Service Unit Tests**:
```typescript
import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'

describe('ServiceName', () => {
  let service: ServiceName
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceName, PrismaService],
    }).compile()

    service = module.get<ServiceName>(ServiceName)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
```

**Resolver Unit Tests with Mocking**:
```typescript
vi.mock('../service.ts') // Mock the service

describe('ResolverName', () => {
  let resolver: ResolverName
  let service: ServiceName

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResolverName, ServiceName],
    }).compile()

    resolver = module.get<ResolverName>(ResolverName)
    service = module.get<ServiceName>(ServiceName)
  })
})
```

#### Test Utilities and Helpers
**Test User Management** (`src/test/testUser.ts`):
```typescript
export function TestAdmin(): CredentialsSignup {
  return {
    email: 'test_e2e_admin@test.com',
    firstName: 'Test',
    lastName: 'Admin',
    password: 'David123!',
    // ... other fields
  }
}
```

**GraphQL Mock Factory** (`src/test/gqlMockFactory.ts`):
- Creates mock execution contexts for GraphQL resolvers
- Provides test-friendly request/response objects
- Supports cookie and body mocking

**Service Mocks** (`src/**/__mocks__/`):
- Manual mocks for complex services
- Consistent return value patterns
- Automatic Vitest mock integration

#### Test Environment Configuration
**Vitest E2E Config**:
```typescript
export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.?(c|m)[jt]s?(x)'],
    isolate: false, // Shared test state
    globals: true,
    globalSetup: './src/test/globalSetup_e2e.ts',
    setupFiles: ['./src/test/integrationTestAdminSetup.ts'],
    pool: 'forks',
    poolOptions: {
      forks: { singleFork: true } // Single process for shared state
    }
  }
})
```

**Environment Variables**:
- `NODE_ENV=test` for all test commands
- `LOG_LEVEL=silent` for E2E tests to reduce output noise
- Database connection configured for test environment

#### Package.json Test Scripts
```json
{
  "testvi": "cross-env NODE_ENV=test vitest --ui run",
  "testvi:watch": "cross-env NODE_ENV=test vitest --watch --ui",
  "testvi:e2e": "cross-env NODE_ENV=test LOG_LEVEL=silent vitest --watch --ui --config ./vitest.config.e2e.mts",
  "testvi:cov": "cross-env NODE_ENV=test vitest --run --coverage"
}
```

#### Testing Best Practices
**E2E Testing Guidelines**:
1. **CRITICAL - Use testWithBothRoles**: ALL E2E tests MUST use `testWithBothRoles` to test admin vs user authorization
2. **Type Safety**: Always type GraphQL responses with proper entity types (e.g., `as { data: { entities: Entity[] } }`)
3. **Readonly Errors**: Use `errors?: readonly any[]` for GraphQL error types to match supertest-graphql
4. **Data Cleanup**: Clean up test data in `afterAll` (for persistent data) or `afterEach` (for per-test data) hooks
5. **Error Scenarios**: Test both success and error scenarios for all operations
6. **Authorization Patterns**: 
   - Queries: Both admin and user should succeed (read access)
   - Mutations: Admin succeeds, user gets forbidden errors (write access)
7. **GraphQL Response Structure**: Use `.expectNoErrors()` only when expecting success, handle errors explicitly for authorization tests
8. **Test Organization**: Group tests by operation type (Queries, Mutations, etc.)
9. **Descriptive Test Names**: Use clear names like "Should enforce create authorization: admin succeeds, user fails"
10. **Consistent Return Objects**: Return structured objects with `hasErrors`, `isAuthorized`, entity data, and `userErrors`

**TypeScript Typing in Tests**:
```typescript
// Query response typing
const response = await createAuthenticatedRequest(role)
  .query(gql`...`)
  .expectNoErrors() as { data: { entities: Entity[] } }

// Mutation response typing (with potential errors)
const response = await createAuthenticatedRequest(role)
  .mutate(gql`...`)
  as { data?: { entityCreate: EntityPayload }, errors?: readonly any[] }

// Return structured test data
return {
  hasErrors: !!response.errors,
  isAuthorized: !response.errors,
  entity: response.data?.entityCreate?.entity as Entity | undefined,
  userErrors: response.data?.entityCreate?.userErrors,
}
```

**E2E Test File Structure**:
```typescript
describe('Entity E2E Tests', () => {
  let testEntityId: number

  beforeAll(async () => {
    // Setup: Check test context, create persistent test data
  }, 30000)

  afterAll(async () => {
    // Cleanup: Remove all test data
  })

  describe('Entity Queries (Both Roles)', () => {
    it('Should list all entities for both roles', async () => {
      const results = await testWithBothRoles(/* ... */)
      // Assert admin behavior
      // Assert user behavior
      // Compare results when appropriate
    })

    it('Should find specific entity for both roles', async () => {
      const results = await testWithBothRoles(/* ... */)
      // Both roles should get same data
    })

    it('Should handle query errors appropriately for both roles', async () => {
      const results = await testWithBothRoles(/* ... */)
      // Both roles should get same errors
    })
  })

  describe('Entity Mutations', () => {
    it('Should enforce create authorization: admin succeeds, user fails', async () => {
      const results = await testWithBothRoles(/* ... */)
      // Admin assertions
      // User assertions (forbidden)
    })

    it('Should enforce update authorization: admin succeeds, user fails', async () => {
      const results = await testWithBothRoles(/* ... */)
      // Admin assertions
      // User assertions (forbidden)
    })

    it('Should enforce delete authorization: admin succeeds, user fails', async () => {
      const results = await testWithBothRoles(/* ... */)
      // User assertions first (since admin will delete)
      // Admin assertions
    })

    it('Should handle validation errors for both roles', async () => {
      const results = await testWithBothRoles(/* ... */)
      // Both roles should get same validation errors
    })
  })

  describe('Entity Update Tests', () => {
    beforeEach(async () => {
      // Create entity for each update test
    })

    afterEach(async () => {
      // Clean up test entity
    })

    it('Should successfully update entity: admin succeeds, user forbidden', async () => {
      const results = await testWithBothRoles(/* ... */)
    })
  })

  describe('Authentication and Authorization', () => {
    it('Should require authentication for all operations', async () => {
      const response = await createAuthenticatedRequest('user')
        .set('Cookie', '') // Remove authentication
        .query(gql`...`) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0].message).toContain('Unauthorized')
    })
  })
})
```

**Authorization Testing Patterns**:
```typescript
// For read operations (queries) - both roles should succeed
expect(results.admin.hasData).toBe(true)
expect(results.user.hasData).toBe(true)
expect(results.user.count).toBe(results.admin.count)

// For write operations (mutations) - admin succeeds, user fails
expect(results.admin.isAuthorized).toBe(true)
expect(results.admin.hasErrors).toBe(false)
expect(results.admin.entity).toBeTruthy()
expect(results.admin.userErrors).toHaveLength(0)

expect(results.user.isAuthorized).toBe(false)
expect(results.user.hasErrors).toBe(true)
expect(results.user.entity).toBeUndefined()

// For validation errors - both roles should get same errors
expect(results.admin.hasErrors).toBe(true)
expect(results.user.hasErrors).toBe(true)
```

**Unit Testing Guidelines**:
1. **Mocking**: Mock external dependencies, especially database services
2. **Isolation**: Each test should be independent and not rely on external state
3. **Coverage**: Focus on business logic and error handling paths
4. **Async Operations**: Properly handle async/await in test assertions

**Mock Patterns**:
- **Service Mocks**: Return consistent payload objects with `userErrors` arrays
- **Database Mocks**: Mock Prisma methods with realistic return values
- **Authentication Mocks**: Mock email confirmation to prevent actual emails

#### Test File Organization
```
src/
  moduleName/
    test/
      module.e2e-spec.ts    # Integration tests
      module.service.spec.ts # Unit tests  
      module.resolver.spec.ts # Resolver tests
      module.stub.ts         # Test data stubs
    __mocks__/
      module.service.ts      # Service mocks
```

**Test Infrastructure Location** (`src/test/`):
- `globalSetup_e2e.ts`: Global test setup and teardown
- `integrationTestAdminSetup.ts`: Admin authentication setup
- `integrationTestUserSetup.ts`: User authentication setup (alternative)
- `integrationTestManager.ts`: Test manager class (alternative pattern)
- `testUser.ts`: Test user factory functions
- `gqlMockFactory.ts`: GraphQL context mocking utilities

### Build & Development
```bash
# Development with watch
pnpm start:dev

# Production build
pnpm build && pnpm start:prod

# TypeScript types generation
pnpm types
```

## Key Architectural Decisions

### Module Structure
- **Festival modules**: Core entities (disciplines, levels, categories, classes, instruments, trophies)
- **Submission modules**: User data (registrations, performers, schools, communities, groups)
- **System modules**: Auth, abilities (CASL), email, payments (Stripe)

### Database Design
- **Prefix convention**: All tables use `tbl_` prefix
- **Performer types**: SOLO, GROUP, SCHOOL, COMMUNITY (enum)
- **Relationships**: Complex many-to-many between classes, performers, and registrations

### Authentication Flow
1. JWT tokens stored in HTTP-only cookies (`diatonicToken`)
2. Email confirmation required before full access
3. Role-based permissions enforced at resolver level
4. Password reset flow with pending state

### Payment Integration
- **Stripe**: Handles payment intents and webhooks
- **Fee calculation**: Domestic (2.9%) vs International (3.7%) processing fees
- **Metadata**: Links payments to WMF confirmation IDs

### Email System Architecture
**CRITICAL**: The email system is built on `@nestjs-modules/mailer` with Handlebars templating for professional HTML emails.

#### Email Module Configuration
```typescript
// Global module with MailerModule.forRootAsync() configuration
transport: {
  host: config.get('EMAIL_SERVER') || 'mail.davesawatzky.com',
  port: config.get('SENDING_SMTP_PORT') || 465,
  secure: true, // SSL/TLS enabled
  auth: {
    user: config.get('EMAIL_USER'),
    pass: config.get('EMAIL_PASSWORD'),
  },
}
```

#### Email Service Pattern
- **EmailService**: Wrapper around MailerService with `sendMail(options: ISendMailOptions)` method
- **Global module**: Available throughout the application without explicit imports
- **Template directory**: `src/email/templates/` with Handlebars (.hbs) files

#### Email Confirmation Workflow
**EmailConfirmationService** handles the complete user verification lifecycle:

1. **Account Creation Flow**:
   - `sendVerificationLink()`: Creates JWT token with email payload, sends confirmation email
   - Token expires based on `JWT_VERIFICATION_TOKEN_EXPIRATION_TIME` environment variable
   - Uses `EMAIL_CONFIRMATION_URL` for frontend verification page

2. **Password Reset Flow**:
   - `sendPasswordResetLink()`: Creates separate JWT token for password reset
   - Uses `PASSWORD_RESET_URL` for frontend reset page
   - Requires `passwordResetPending` flag in user record

3. **Email Confirmation Controller**:
   - REST endpoints: `/email-confirmation/confirm`, `/email-confirmation/resend-confirmation-link`, `/email-confirmation/resend-password-link`
   - Validates tokens and updates user email confirmation status
   - Throws `BadRequestException` for already confirmed emails

#### Email Templates
**Professional HTML templates** built with MJML and compiled to Handlebars:

1. **confirmation-email.hbs**:
   - Context variables: `{{ name }}`, `{{ confirmationLink }}`
   - Responsive design with WMF branding
   - Call-to-action button for account verification

2. **password-reset-template.hbs**:
   - Context variables: `{{ email }}`, `{{ resetLink }}`
   - Security-focused messaging for password changes
   - Branded footer with organization contact information

#### Template Development Workflow
- **Source files**: `.mjml` files for email design
- **Compiled output**: `.hbs` files for production use
- **Styling**: Inline CSS for maximum email client compatibility
- **Branding**: WMF logo, colors (#005984, #017cb8), and official contact information

#### Security & Token Management
```typescript
// JWT token creation pattern
const payload: VerificationTokenPayload = { email }
const token = this.jwtService.sign(payload, {
  secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
  expiresIn: `${this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`,
})
```

- **Separate secrets**: Different JWT secrets for auth vs email verification
- **Expiration handling**: Time-limited tokens for security
- **Email validation**: Ensures one-time use and prevents replay attacks

#### Environment Configuration
Required email-related environment variables:
- `EMAIL_SERVER`: SMTP host
- `SENDING_SMTP_PORT`: Usually 465 for SSL
- `EMAIL_USER`: SMTP authentication username
- `EMAIL_PASSWORD`: SMTP authentication password
- `JWT_VERIFICATION_TOKEN_SECRET`: Separate from main JWT secret
- `JWT_VERIFICATION_TOKEN_EXPIRATION_TIME`: Token lifespan in seconds
- `EMAIL_CONFIRMATION_URL`: Frontend URL for email verification
- `PASSWORD_RESET_URL`: Frontend URL for password reset

## Import Conventions
Always use absolute imports with `@/` prefix:
```typescript
import { UserError } from '@/common.entity'
import { PrismaService } from '@/prisma/prisma.service'
```

## Testing Patterns
**CRITICAL**: All E2E tests MUST use the `testWithBothRoles` pattern from `src/test/testHelpers.ts`.

### E2E Test Requirements
1. **Use testWithBothRoles**: Every E2E test must test both admin and user roles simultaneously
2. **Type GraphQL Responses**: Always cast responses with proper entity types
3. **Test Authorization**: Verify that admin has write access and user has read-only access
4. **Structure Tests Consistently**: Group by Queries (both roles succeed) and Mutations (admin succeeds, user fails)
5. **Clean Test Data**: Use `beforeAll`/`afterAll` for persistent data, `beforeEach`/`afterEach` for per-test data

### Test Helper Usage
```typescript
import { createAuthenticatedRequest, testWithBothRoles } from '@/test/testHelpers'

// Create authenticated requests for specific roles
const response = await createAuthenticatedRequest('admin').query(gql`...`)
const response = await createAuthenticatedRequest('user').mutate(gql`...`)

// Test with both roles automatically
const results = await testWithBothRoles('operation name', async (role) => {
  const response = await createAuthenticatedRequest(role).query(gql`...`)
  return { hasData: !!response.data }
})
// results = { admin: { hasData: true }, user: { hasData: true } }
```

### Example Test Structure
See the field-config E2E tests (`src/submissions/field-config/test/field-config.e2e-spec.ts`) for a complete reference implementation with 18 comprehensive tests covering queries, mutations, updates, deletes, and authorization.

## Configuration Notes
- **Environment files**: `.env.development`, `.env.test`, `.env.production`
- **Database URL**: Uses dotenvx for environment management
- **CORS**: Configured for specific frontend origin
- **Helmet**: Security headers enabled with Apollo GraphQL exceptions