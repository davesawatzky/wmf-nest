---
name: wmf-festival-domain
description: Use when changing Winnipeg Music Festival classes, registrations, performers, schools, communities, groups, selections, trophies, field configuration, eligibility, pricing, or related Prisma and GraphQL domain behavior.
license: UNLICENSED
metadata:
  author: wmf-nest
  version: '1.0.0'
---

# Winnipeg Music Festival Domain

Apply these invariants when implementing or reviewing festival behavior. Combine this skill with `nestjs-server` for NestJS structure, authorization, errors, testing, and verification.

## Core hierarchy

The class catalog is organized as:

`Discipline -> Subdiscipline -> Level -> Category`

- `Discipline` represents broad areas such as Piano, Voice, or Strings.
- `Subdiscipline` represents a specific area and owns performer limits and pricing context.
- `Level` represents skill or grade classification.
- `Category` represents the competition format, such as Solo, Duet, Own Choice, or Set Piece.
- `tbl_classlist` is the central competition unit and links the hierarchy to class type and trophies.

Festival classes preserve at least the class number, description, performer type, price, selection limits, required selection, and relationship identifiers. Class numbers are unique and should not be silently changed when adding behavior.

## Performer types and registrations

The supported performer types are `SOLO`, `GROUP`, `SCHOOL`, and `COMMUNITY`.

- `SOLO`: one individual performer.
- `GROUP`: an ensemble with multiple performers and shared contact information.
- `SCHOOL`: a school-based performance that may contain school groups.
- `COMMUNITY`: a community organization or adult group that may contain community groups.

Registration behavior follows this sequence:

1. Create a registration with its performer type and label.
2. Add performer, group, school, or community information.
3. Register one or more festival classes.
4. Submit selections for each registered class.
5. Finalize the registration and process payment.

A festival class may only be registered when `festivalClass.performerType` equals `registration.performerType`; return a userError otherwise. Performer, group, school, and community records may only be attached to registrations of their matching performer type.

## Business rules

Preserve these rules when changing services, resolvers, or persistence:

- A performer must be eligible for the selected class.
- Selection counts must satisfy `minSelections` and `maxSelections`.
- A required selection must be supplied when the class requires one.
- Class pricing must be included in registration totals.
- Teacher assignment is required for `SOLO` and `GROUP` registrations; for `SCHOOL` and `COMMUNITY` registrations the teacher/conductor is optional unless `tbl_field_config` marks it required for that performer type.
- School and community registrations may contain multiple groups.
- Foreign-key and unique constraints are part of the domain contract, not merely database implementation details.
- Core records retain timestamps and submission or confirmation information needed for auditability.

When adding fields to registration forms, check `tbl_field_config` and the performer type rules instead of hard-coding one workflow's requirements into every form.

Example validation before registering a class:

```typescript
if (registration.performerType !== festivalClass.performerType) {
  return {
    userErrors: [{ message: 'Class performer type does not match registration', field: ['classId'] }],
    registeredClass: null,
  }
}

if (selectionCount < festivalClass.minSelections || selectionCount > festivalClass.maxSelections) {
  return {
    userErrors: [{ message: 'Selection count is outside the class limits', field: ['selections'] }],
    registeredClass: null,
  }
}
```

Validate these rules before the write and keep the class details needed for the registration snapshot.

## Relationships and navigation

Common GraphQL navigation paths include:

- Festival class -> subdiscipline -> discipline -> instruments
- Registration -> performers -> selections -> registered classes
- School -> school groups -> performers
- Level -> categories -> subdisciplines -> festival classes
- Festival class -> trophies through `tbl_class_trophy`

Use the existing request-scoped DataLoader approach for relationship field resolvers. Preserve ordering, null handling, deduplication, and authorization as described by `nestjs-server`.

## Change checklist

Before finishing a domain change, verify:

- The performer type and registration workflow remain valid.
- Eligibility, selection, pricing, teacher, and group rules are covered.
- Class snapshots and audit fields are preserved where historical data requires them.
- New relationships are registered in Prisma, the module, and GraphQL metadata as needed.
- Tests cover both successful and invalid domain states, plus authorization when exposed through GraphQL.
