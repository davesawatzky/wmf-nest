# Subdiscipline DataLoader Implementation

## Overview

The `SubdisciplineDataLoader` service implements request-scoped batching for GraphQL field resolvers in the subdiscipline resolver to solve the N+1 query problem. This significantly improves performance when fetching subdiscipline-related data.

## Problem Solved

### Before DataLoader (N+1 Query Problem)

When fetching multiple subdisciplines with nested field resolvers, the system would execute:
- 1 query to fetch all subdisciplines
- N queries for disciplines (one per subdiscipline)
- N queries for categories (one per subdiscipline)
- N queries for levels (one per subdiscipline)

**Total**: **1 + 3N queries** for N subdisciplines

Example with 20 subdisciplines:
- Without DataLoader: **1 + 3×20 = 61 queries**

### After DataLoader (Batch Loading)

With DataLoader batching:
- 1 query to fetch all subdisciplines
- 1 batched query for all disciplines
- 2 batched queries for categories (festival classes + categories)
- 2 batched queries for levels (festival classes + levels)

**Total**: **6 queries**

Example with 20 subdisciplines:
- With DataLoader: **6 queries**
- **Query reduction: 61 → 6 queries (90% reduction)**

## Implementation Details

### DataLoader Configuration

```typescript
@Injectable({ scope: Scope.REQUEST })
export class SubdisciplineDataLoader {
  constructor(private readonly prisma: PrismaService) {}

  readonly disciplineLoader = new DataLoader<number, tbl_discipline | null>(...)
  readonly categoriesLoader = new DataLoader<number, tbl_category[]>(...)
  readonly levelsLoader = new DataLoader<number, tbl_level[]>(...)
}
```

### Key Features

1. **Request-Scoped**: Each GraphQL request gets a fresh DataLoader instance
2. **Automatic Batching**: DataLoader collects all `.load()` calls within a single tick
3. **Indirect Many-to-Many**: Categories and levels are linked through `tbl_classlist` (festival classes)
4. **Comprehensive Logging**: All batch queries include timing and result count logging

### Batch Query Patterns

#### Direct One-to-One Relationship
- `disciplineLoader`: Returns single discipline by disciplineID

```typescript
const disciplineMap = new Map(disciplines.map(discipline => [discipline.id, discipline]))
return disciplineIDs.map(id => disciplineMap.get(id) || null)
```

#### Indirect Many-to-Many Through Festival Classes
- `categoriesLoader`: Returns categories linked via `tbl_classlist`
- `levelsLoader`: Returns levels linked via `tbl_classlist`

```typescript
// Step 1: Get festival classes for subdisciplines
const festivalClasses = await this.prisma.tbl_classlist.findMany({
  where: { subdisciplineID: { in: [...subdisciplineIDs] } },
  select: { subdisciplineID: true, categoryID: true },
  distinct: ['subdisciplineID', 'categoryID'],
})

// Step 2: Fetch all categories
const categories = await this.prisma.tbl_category.findMany({
  where: { id: { in: uniqueCategoryIDs } },
})

// Step 3: Group categories by subdisciplineID
const subdisciplineCategoryMap = new Map<number, tbl_category[]>()
festivalClasses.forEach((fc) => {
  const category = categoryMap.get(fc.categoryID)
  if (category) {
    const existing = subdisciplineCategoryMap.get(fc.subdisciplineID) || []
    if (!existing.find(c => c.id === category.id)) {
      subdisciplineCategoryMap.set(fc.subdisciplineID, [...existing, category])
    }
  }
})
```

## Database Schema Mapping

### Subdiscipline Relationships
```prisma
model tbl_subdiscipline {
  id             Int              @id
  disciplineID   Int              // → tbl_discipline (one-to-one)
  name           String
  performerType  tbl_subdiscipline_performer_type
  // ... other fields

  tbl_discipline tbl_discipline   @relation(fields: [disciplineID])
  tbl_classlist  tbl_classlist[]  // one-to-many
}

model tbl_classlist {
  id              Int              @id
  subdisciplineID Int              // Links to subdiscipline
  categoryID      Int              // Links to category
  levelID         Int              // Links to level
  // ... other fields
}
```

### Indirect Relationships
- **Subdiscipline → Categories**: Via `tbl_classlist.categoryID`
- **Subdiscipline → Levels**: Via `tbl_classlist.levelID`
- These are many-to-many relationships where festival classes act as the junction table

## Usage in Resolver

### Before (Direct Service Calls)
```typescript
@ResolveField(() => [Category])
async categories(@Parent() subdiscipline: tbl_subdiscipline) {
  const subdisciplineID = subdiscipline.id
  return await this.categoryService.findAll(undefined, subdisciplineID) // N+1 query
}
```

### After (DataLoader Batching)
```typescript
@ResolveField(() => [Category])
async categories(@Parent() subdiscipline: tbl_subdiscipline) {
  if (!subdiscipline?.id) return null
  return await this.subdisciplineDataLoader.categoriesLoader.load(subdiscipline.id)
}
```

## Performance Monitoring

Each DataLoader includes comprehensive logging:

```typescript
this.logger.log(`[DataLoader] Batching ${subdisciplineIDs.length} categories queries`)
const start = Date.now()
// ... query execution
const elapsed = Date.now() - start
this.logger.log(`[DataLoader] Fetched ${categories.length} categories in ${elapsed}ms`)
```

### Sample Log Output
```
[SubdisciplineDataLoader] Batching 20 discipline queries
[SubdisciplineDataLoader] Fetched 8 disciplines in 10ms
[SubdisciplineDataLoader] Batching 20 categories queries
[SubdisciplineDataLoader] Fetched 15 categories in 18ms
[SubdisciplineDataLoader] Batching 20 levels queries
[SubdisciplineDataLoader] Fetched 12 levels in 16ms
```

## Benefits

1. **Performance**: 90% reduction in database queries for typical subdiscipline lists
2. **Scalability**: Query count stays constant regardless of subdiscipline count
3. **Deduplication**: Automatically removes duplicate categories/levels per subdiscipline
4. **Ordering**: Maintains proper sorting (categories by name, levels by sortOrder)
5. **Transparency**: Frontend code requires zero changes

## Testing

Test the DataLoader by querying subdisciplines with nested fields:

```graphql
query GetSubdisciplines {
  subdisciplines {
    id
    name
    performerType
    discipline {
      id
      name
    }
    categories {
      id
      name
    }
    levels {
      id
      name
      sortOrder
    }
    festivalClasses {
      id
      classNumber
      description
    }
  }
}
```

Check logs to verify batching is working correctly.

## Complex Relationship Handling

### Why Two Queries for Categories/Levels?

The categories and levels loaders use a two-step approach:

1. **Query festival classes**: Get the junction data linking subdisciplines to categories/levels
2. **Query actual entities**: Fetch the category/level records with proper ordering

This approach is necessary because:
- Categories and levels don't have direct foreign keys to subdisciplines
- The relationship is implicit through festival classes
- We need to maintain proper ordering and deduplication
- Single query with includes would be less efficient and harder to deduplicate

### Deduplication Logic

Since multiple festival classes can link to the same category/level for a subdiscipline:
```typescript
if (!existing.find(c => c.id === category.id)) {
  subdisciplineCategoryMap.set(fc.subdisciplineID, [...existing, category])
}
```

This ensures each category/level appears only once per subdiscipline.

## Null Handling

- **disciplineLoader**: Returns null if discipline not found
- **categoriesLoader**: Returns empty array `[]` if no categories found
- **levelsLoader**: Returns empty array `[]` if no levels found

## Relationship to Other DataLoaders

This follows the same architectural pattern as:
- `FestivalClassDataLoader`: Request-scoped batching with logging
- `RegistrationDataLoader`: Handles both one-to-one and one-to-many relationships

Key difference: Subdiscipline DataLoader handles **indirect many-to-many** relationships through a junction table.

## Potential Future Optimizations

1. **Festival Class DataLoader**: The `festivalClasses` field resolver could also use DataLoader if it becomes a performance bottleneck
2. **Caching Strategy**: Consider caching category/level lists if they change infrequently
3. **Pagination**: If subdisciplines return large numbers of categories/levels, add pagination support

## Query Efficiency Notes

### Categories and Levels Queries

The current implementation executes:
1. One `findMany` on `tbl_classlist` to get relationships
2. One `findMany` on `tbl_category` or `tbl_level` to get full records

**Alternative considered**: Single query with `include`:
```typescript
// Less efficient approach
const festivalClasses = await this.prisma.tbl_classlist.findMany({
  where: { subdisciplineID: { in: [...subdisciplineIDs] } },
  include: { tbl_category: true },
})
```

**Why two queries is better**:
- Avoids fetching duplicate category/level records (N×M problem)
- Allows proper distinct selection
- Enables efficient deduplication
- Better performance with proper indexes

## Related Files

- `subdiscipline.dataloader.ts`: DataLoader service implementation
- `subdiscipline.resolver.ts`: Field resolvers using DataLoader
- `subdiscipline.module.ts`: Module configuration with DataLoader provider
- `subdiscipline.service.ts`: Service for mutation operations (unchanged)
