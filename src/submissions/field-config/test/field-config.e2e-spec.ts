import gql from 'graphql-tag'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import {
  createAuthenticatedRequest,
  testWithBothRoles,
} from '@/test/testHelpers'
import {
  FieldConfig,
  FieldConfigPayload,
} from '../entities/field-config.entity'

describe('Field Config E2E Tests', () => {
  let testFieldConfigId: number
  let queryTestFieldConfigId: number

  beforeAll(async () => {
    // Wait for test context to be available
    if (!globalThis.testContext) {
      throw new Error('Test context not initialized. Check integrationTestSetup.')
    }

    // Clean up any existing test data
    await globalThis.prisma.tbl_field_config.deleteMany({
      where: {
        OR: [
          { tableName: { startsWith: 'test_' } },
          { fieldName: { startsWith: 'e2e_test_' } },
        ],
      },
    })

    // Create a persistent field config for query tests
    const testConfig = await globalThis.prisma.tbl_field_config.create({
      data: {
        tableName: 'test_query_table',
        fieldName: 'e2e_test_query_field',
        submissionRequired: true,
        communityRequired: false,
        groupRequired: true,
        schoolRequired: false,
        soloRequired: true,
        customField: false,
        customFieldType: 'text',
      },
    })
    queryTestFieldConfigId = testConfig.id
  }, 30000) // 30 second timeout for setup

  afterAll(async () => {
    // Final cleanup
    await globalThis.prisma.tbl_field_config.deleteMany({
      where: {
        OR: [
          { tableName: { startsWith: 'test_' } },
          { fieldName: { startsWith: 'e2e_test_' } },
        ],
      },
    })
  })

  // Test read operations with both admin and user roles
  describe('Field Config Queries (Both Roles)', () => {
    it('Should list all field configurations for both roles', async () => {
      const results = await testWithBothRoles(
        'list field configs',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetFieldConfigs {
                fieldConfigs {
                  id
                  tableName
                  fieldName
                  submissionRequired
                  communityRequired
                  groupRequired
                  schoolRequired
                  soloRequired
                  customField
                  customFieldType
                }
              }
            `)
            .expectNoErrors() as { data: { fieldConfigs: FieldConfig[] } }

          const configs = response.data.fieldConfigs
          const firstConfig = configs[0]

          return {
            hasData: !!configs,
            isArray: Array.isArray(configs),
            count: configs?.length || 0,
            configs,
            // Type validations
            hasValidTypes: typeof firstConfig?.id === 'number'
              && typeof firstConfig?.tableName === 'string'
              && typeof firstConfig?.fieldName === 'string'
              && typeof firstConfig?.submissionRequired === 'boolean'
              && typeof firstConfig?.communityRequired === 'boolean'
              && typeof firstConfig?.groupRequired === 'boolean'
              && typeof firstConfig?.schoolRequired === 'boolean'
              && typeof firstConfig?.soloRequired === 'boolean'
              && typeof firstConfig?.customField === 'boolean',
            // Verify test config is included
            includesTestConfig: configs.some(
              (config: FieldConfig) => config.id === queryTestFieldConfigId,
            ),
          }
        },
      )

      // Both roles should successfully retrieve field configs
      expect(results.admin.hasData).toBe(true)
      expect(results.admin.isArray).toBe(true)
      expect(results.admin.hasValidTypes).toBe(true)
      expect(results.admin.includesTestConfig).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.user.isArray).toBe(true)
      expect(results.user.hasValidTypes).toBe(true)

      // Both should see the same data (read-only operation)
      expect(results.admin.count).toBeGreaterThan(0)
      expect(results.user.count).toBe(results.admin.count)
    })

    it('Should find specific field configuration for both roles', async () => {
      const results = await testWithBothRoles(
        'find specific field config',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetFieldConfig($tableName: String!, $fieldName: String!) {
                fieldConfig(tableName: $tableName, fieldName: $fieldName) {
                  id
                  tableName
                  fieldName
                  submissionRequired
                  communityRequired
                  groupRequired
                  schoolRequired
                  soloRequired
                  customField
                  customFieldType
                }
              }
            `, {
              tableName: 'test_query_table',
              fieldName: 'e2e_test_query_field',
            })
            .expectNoErrors() as { data: { fieldConfig: FieldConfig } }

          return {
            found: !!response.data.fieldConfig,
            data: response.data.fieldConfig as FieldConfig | undefined,
          }
        },
      )

      // Both roles should find the same field config
      expect(results.admin.found).toBe(true)
      expect(results.user.found).toBe(true)
      expect(results.admin.data).toBeTruthy()
      expect(results.user.data).toBeTruthy()

      // Verify they retrieved the same record
      if (results.admin.data && results.user.data) {
        expect(results.user.data.id).toBe(results.admin.data.id)
        expect(results.user.data.id).toBe(queryTestFieldConfigId)
        expect(results.user.data.tableName).toBe(results.admin.data.tableName)
        expect(results.user.data.fieldName).toBe(results.admin.data.fieldName)
        expect(results.admin.data.tableName).toBe('test_query_table')
        expect(results.admin.data.fieldName).toBe('e2e_test_query_field')
        expect(results.admin.data.submissionRequired).toBe(true)
        expect(results.admin.data.groupRequired).toBe(true)
        expect(results.admin.data.soloRequired).toBe(true)
      }
    })

    it('Should handle query errors appropriately for both roles', async () => {
      const results = await testWithBothRoles(
        'query non-existent field config',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetFieldConfig($tableName: String!, $fieldName: String!) {
                fieldConfig(tableName: $tableName, fieldName: $fieldName) {
                  id
                  tableName
                  fieldName
                }
              }
            `, {
              tableName: 'nonexistent_table',
              fieldName: 'nonexistent_field',
            }) as { data?: { fieldConfig: FieldConfig }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            errorMessage: response.errors?.[0]?.message || '',
          }
        },
      )

      // Both roles should get the same error
      expect(results.admin.hasErrors).toBe(true)
      expect(results.admin.errorMessage).toContain('not found')
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.errorMessage).toContain('not found')
    })

    it('Should handle missing parameters appropriately for both roles', async () => {
      const results = await testWithBothRoles(
        'query with missing parameters',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetFieldConfig($tableName: String!, $fieldName: String!) {
                fieldConfig(tableName: $tableName, fieldName: $fieldName) {
                  id
                  tableName
                  fieldName
                }
              }
            `, {
              tableName: '',
              fieldName: '',
            }) as { data?: { fieldConfig: FieldConfig }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
          }
        },
      )

      // Both roles should get errors for empty parameters
      expect(results.admin.hasErrors).toBe(true)
      expect(results.user.hasErrors).toBe(true)
    })
  })

  // Test authorization differences for mutations
  describe('Field Config Mutations', () => {
    const createInput = {
      tableName: 'test_table',
      fieldName: 'test_field',
      submissionRequired: true,
      customField: false,
      soloRequired: true,
      groupRequired: false,
      schoolRequired: true,
      communityRequired: false,
    }

    it('Should enforce create authorization: admin succeeds, user fails', async () => {
      const results = await testWithBothRoles(
        'create field config',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateFieldConfig($fieldConfigInput: FieldConfigInput!) {
                fieldConfigCreate(fieldConfigInput: $fieldConfigInput) {
                  userErrors {
                    message
                    field
                  }
                  fieldConfig {
                    id
                    tableName
                    fieldName
                  }
                }
              }
            `, {
              fieldConfigInput: {
                ...createInput,
                tableName: `test_${role}_table`, // Different table name per role
              },
            }) as { data?: { fieldConfigCreate: FieldConfigPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            fieldConfig: response.data?.fieldConfigCreate?.fieldConfig as FieldConfig | undefined,
            userErrors: response.data?.fieldConfigCreate?.userErrors,
          }
        },
      )

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.fieldConfig).toBeTruthy()
      expect(results.admin.userErrors).toHaveLength(0)

      // Store admin's created ID for later tests
      if (results.admin.fieldConfig) {
        testFieldConfigId = results.admin.fieldConfig.id
      }

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.fieldConfig).toBeUndefined()
    })

    it('Should enforce update authorization: admin succeeds, user fails', async () => {
      const updateInput = { ...createInput, submissionRequired: false }

      const results = await testWithBothRoles(
        'update field config',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateFieldConfig($fieldConfigID: Int!, $fieldConfigInput: FieldConfigInput!) {
                fieldConfigUpdate(fieldConfigID: $fieldConfigID, fieldConfigInput: $fieldConfigInput) {
                  userErrors {
                    message
                    field
                  }
                  fieldConfig {
                    id
                    submissionRequired
                  }
                }
              }
            `, {
              fieldConfigID: testFieldConfigId,
              fieldConfigInput: updateInput,
            }) as { data?: { fieldConfigUpdate: FieldConfigPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            fieldConfig: response.data?.fieldConfigUpdate?.fieldConfig as FieldConfig | undefined,
            userErrors: response.data?.fieldConfigUpdate?.userErrors,
          }
        },
      )

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.fieldConfig).toBeTruthy()
      expect(results.admin.fieldConfig?.submissionRequired).toBe(false)
      expect(results.admin.userErrors).toHaveLength(0)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.fieldConfig).toBeUndefined()
    })

    it('Should enforce delete authorization: admin succeeds, user fails', async () => {
      const results = await testWithBothRoles(
        'delete field config',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteFieldConfig($fieldConfigID: Int!) {
                fieldConfigDelete(fieldConfigID: $fieldConfigID) {
                  userErrors {
                    message
                    field
                  }
                  fieldConfig {
                    id
                    tableName
                    fieldName
                  }
                }
              }
            `, { fieldConfigID: testFieldConfigId }) as { data?: { fieldConfigDelete: FieldConfigPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            fieldConfig: response.data?.fieldConfigDelete?.fieldConfig as FieldConfig | undefined,
            userErrors: response.data?.fieldConfigDelete?.userErrors,
          }
        },
      )

      // User should be forbidden (tested first since admin will delete the record)
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.fieldConfig).toBeUndefined()

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.fieldConfig).toBeTruthy()
      expect(results.admin.fieldConfig?.id).toBe(testFieldConfigId)
      expect(results.admin.userErrors).toHaveLength(0)
    })

    it('Should handle create with duplicate data: admin gets userError, user forbidden', async () => {
      // First, create a record that we'll try to duplicate
      await globalThis.prisma.tbl_field_config.create({
        data: {
          tableName: 'test_duplicate_table',
          fieldName: 'test_duplicate_field',
          submissionRequired: true,
          customField: false,
          soloRequired: true,
          groupRequired: false,
          schoolRequired: true,
          communityRequired: false,
        },
      })

      const results = await testWithBothRoles(
        'create duplicate field config',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateFieldConfig($fieldConfigInput: FieldConfigInput!) {
                fieldConfigCreate(fieldConfigInput: $fieldConfigInput) {
                  userErrors {
                    message
                    field
                  }
                  fieldConfig {
                    id
                    tableName
                    fieldName
                  }
                }
              }
            `, {
              fieldConfigInput: {
                tableName: 'test_duplicate_table',
                fieldName: 'test_duplicate_field',
                submissionRequired: true,
                customField: false,
                soloRequired: true,
                groupRequired: false,
                schoolRequired: true,
                communityRequired: false,
              },
            }) as { data?: { fieldConfigCreate: FieldConfigPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            fieldConfig: response.data?.fieldConfigCreate?.fieldConfig as FieldConfig | undefined,
            userErrors: response.data?.fieldConfigCreate?.userErrors,
          }
        },
      )

      // Admin is authorized but should get userError for duplicate
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.userErrors).toBeDefined()
      expect(results.admin.userErrors!.length).toBeGreaterThan(0)
      expect(results.admin.userErrors![0].message).toContain('already exists')
      expect(results.admin.fieldConfig).toBeNull()

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
    })

    it('Should handle create with invalid input: both roles get GraphQL errors', async () => {
      const results = await testWithBothRoles(
        'create with invalid input',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateFieldConfig($fieldConfigInput: FieldConfigInput!) {
                fieldConfigCreate(fieldConfigInput: $fieldConfigInput) {
                  userErrors {
                    message
                    field
                  }
                  fieldConfig {
                    id
                  }
                }
              }
            `, {
              fieldConfigInput: {
                tableName: null,
                fieldName: null,
                submissionRequired: 'invalid',
              },
            }) as { data?: { fieldConfigCreate: FieldConfigPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            errorMessage: response.errors?.[0]?.message || '',
          }
        },
      )

      // Both roles should get GraphQL validation errors
      expect(results.admin.hasErrors).toBe(true)
      expect(results.admin.errorMessage).toContain('Variable')
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.errorMessage).toContain('Variable')
    })

    it('Should create with minimal required fields: admin succeeds, user forbidden', async () => {
      const results = await testWithBothRoles(
        'create minimal field config',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateFieldConfig($fieldConfigInput: FieldConfigInput!) {
                fieldConfigCreate(fieldConfigInput: $fieldConfigInput) {
                  userErrors {
                    message
                    field
                  }
                  fieldConfig {
                    id
                    tableName
                    fieldName
                    customFieldType
                  }
                }
              }
            `, {
              fieldConfigInput: {
                tableName: `test_minimal_${role}_table`,
                fieldName: 'e2e_test_minimal_field',
                submissionRequired: false,
                communityRequired: false,
                groupRequired: false,
                schoolRequired: false,
                soloRequired: false,
                customField: false,
              },
            }) as { data?: { fieldConfigCreate: FieldConfigPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            fieldConfig: response.data?.fieldConfigCreate?.fieldConfig as FieldConfig | undefined,
            userErrors: response.data?.fieldConfigCreate?.userErrors,
          }
        },
      )

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.fieldConfig).toBeTruthy()
      expect(results.admin.fieldConfig?.tableName).toBe('test_minimal_admin_table')
      expect(results.admin.fieldConfig?.fieldName).toBe('e2e_test_minimal_field')
      expect(results.admin.userErrors).toHaveLength(0)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
    })

    it('Should create with custom field type: admin succeeds, user forbidden', async () => {
      const results = await testWithBothRoles(
        'create custom field config',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateFieldConfig($fieldConfigInput: FieldConfigInput!) {
                fieldConfigCreate(fieldConfigInput: $fieldConfigInput) {
                  userErrors {
                    message
                    field
                  }
                  fieldConfig {
                    id
                    tableName
                    fieldName
                    customField
                    customFieldType
                  }
                }
              }
            `, {
              fieldConfigInput: {
                tableName: `test_custom_${role}_table`,
                fieldName: 'e2e_test_custom_field',
                submissionRequired: true,
                communityRequired: false,
                groupRequired: false,
                schoolRequired: false,
                soloRequired: true,
                customField: true,
                customFieldType: 'date',
              },
            }) as { data?: { fieldConfigCreate: FieldConfigPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            fieldConfig: response.data?.fieldConfigCreate?.fieldConfig as FieldConfig | undefined,
            userErrors: response.data?.fieldConfigCreate?.userErrors,
          }
        },
      )

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.fieldConfig).toBeTruthy()
      expect(results.admin.fieldConfig?.customField).toBe(true)
      expect(results.admin.fieldConfig?.customFieldType).toBe('date')
      expect(results.admin.userErrors).toHaveLength(0)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
    })
  })

  describe('Field Config Update Tests', () => {
    let updateTestFieldConfigId: number

    beforeEach(async () => {
      // Create a field config for updating in each test
      const testConfig = await globalThis.prisma.tbl_field_config.create({
        data: {
          tableName: 'test_update_table',
          fieldName: 'e2e_test_update_field',
          submissionRequired: false,
          communityRequired: false,
          groupRequired: false,
          schoolRequired: false,
          soloRequired: false,
          customField: false,
          customFieldType: 'text',
        },
      })
      updateTestFieldConfigId = testConfig.id
    })

    afterEach(async () => {
      // Clean up test data
      if (updateTestFieldConfigId) {
        await globalThis.prisma.tbl_field_config
          .delete({
            where: { id: updateTestFieldConfigId },
          })
          .catch(() => {}) // Ignore errors if already deleted
      }
    })

    it('Should successfully update field config: admin succeeds, user forbidden', async () => {
      const results = await testWithBothRoles(
        'update field config',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateFieldConfig(
                $fieldConfigId: Int!
                $fieldConfigInput: FieldConfigInput!
              ) {
                fieldConfigUpdate(
                  fieldConfigID: $fieldConfigId
                  fieldConfigInput: $fieldConfigInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  fieldConfig {
                    id
                    tableName
                    fieldName
                    submissionRequired
                    communityRequired
                    groupRequired
                    schoolRequired
                    soloRequired
                    customField
                    customFieldType
                  }
                }
              }
            `, {
              fieldConfigId: updateTestFieldConfigId,
              fieldConfigInput: {
                tableName: 'test_updated_table',
                fieldName: 'e2e_test_updated_field',
                submissionRequired: true,
                communityRequired: true,
                groupRequired: true,
                schoolRequired: true,
                soloRequired: true,
                customField: true,
                customFieldType: 'number',
              },
            }) as { data?: { fieldConfigUpdate: FieldConfigPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            fieldConfig: response.data?.fieldConfigUpdate?.fieldConfig as FieldConfig | undefined,
            userErrors: response.data?.fieldConfigUpdate?.userErrors,
          }
        },
      )

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.fieldConfig).toBeTruthy()
      expect(results.admin.fieldConfig?.id).toBe(updateTestFieldConfigId)
      expect(results.admin.fieldConfig?.tableName).toBe('test_updated_table')
      expect(results.admin.fieldConfig?.fieldName).toBe('e2e_test_updated_field')
      expect(results.admin.fieldConfig?.submissionRequired).toBe(true)
      expect(results.admin.fieldConfig?.communityRequired).toBe(true)
      expect(results.admin.fieldConfig?.customFieldType).toBe('number')
      expect(results.admin.userErrors).toHaveLength(0)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
    })

    it('Should handle update of non-existent field config: admin gets userError, user forbidden', async () => {
      const results = await testWithBothRoles(
        'update non-existent field config',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateFieldConfig(
                $fieldConfigId: Int!
                $fieldConfigInput: FieldConfigInput!
              ) {
                fieldConfigUpdate(
                  fieldConfigID: $fieldConfigId
                  fieldConfigInput: $fieldConfigInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  fieldConfig {
                    id
                  }
                }
              }
            `, {
              fieldConfigId: 99999,
              fieldConfigInput: {
                tableName: 'non_existent_table',
                fieldName: 'non_existent_field',
                submissionRequired: true,
                communityRequired: false,
                groupRequired: false,
                schoolRequired: false,
                soloRequired: false,
                customField: false,
              },
            }) as { data?: { fieldConfigUpdate: FieldConfigPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            fieldConfig: response.data?.fieldConfigUpdate?.fieldConfig as FieldConfig | undefined,
            userErrors: response.data?.fieldConfigUpdate?.userErrors,
          }
        },
      )

      // Admin is authorized but should get userError
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.userErrors).toBeDefined()
      expect(results.admin.userErrors!.length).toBeGreaterThan(0)
      expect(results.admin.userErrors![0].message).toContain('not found')
      expect(results.admin.fieldConfig).toBeNull()

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
    })

    it('Should handle update with invalid input: both roles get GraphQL errors', async () => {
      const results = await testWithBothRoles(
        'update with invalid input',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateFieldConfig(
                $fieldConfigId: Int!
                $fieldConfigInput: FieldConfigInput!
              ) {
                fieldConfigUpdate(
                  fieldConfigID: $fieldConfigId
                  fieldConfigInput: $fieldConfigInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  fieldConfig {
                    id
                  }
                }
              }
            `, {
              fieldConfigId: updateTestFieldConfigId,
              fieldConfigInput: {
                tableName: null,
                fieldName: '',
                submissionRequired: 'invalid_boolean',
              },
            }) as { data?: { fieldConfigUpdate: FieldConfigPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
          }
        },
      )

      // Both roles should get GraphQL validation errors
      expect(results.admin.hasErrors).toBe(true)
      expect(results.user.hasErrors).toBe(true)
    })
  })

  describe('Field Config Delete Tests', () => {
    let deleteTestFieldConfigId: number

    beforeEach(async () => {
      // Create a field config for deletion
      const testConfig = await globalThis.prisma.tbl_field_config.create({
        data: {
          tableName: 'test_delete_table',
          fieldName: 'e2e_test_delete_field',
          submissionRequired: false,
          communityRequired: false,
          groupRequired: false,
          schoolRequired: false,
          soloRequired: false,
          customField: false,
          customFieldType: 'text',
        },
      })
      deleteTestFieldConfigId = testConfig.id
    })

    afterEach(async () => {
      // Clean up if deletion test failed
      if (deleteTestFieldConfigId) {
        await globalThis.prisma.tbl_field_config
          .delete({
            where: { id: deleteTestFieldConfigId },
          })
          .catch(() => {}) // Ignore errors if already deleted
      }
    })

    it('Should successfully delete field config: admin succeeds, user forbidden', async () => {
      const results = await testWithBothRoles(
        'delete field config',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteFieldConfig($fieldConfigId: Int!) {
                fieldConfigDelete(fieldConfigID: $fieldConfigId) {
                  userErrors {
                    message
                    field
                  }
                  fieldConfig {
                    id
                    tableName
                    fieldName
                  }
                }
              }
            `, {
              fieldConfigId: deleteTestFieldConfigId,
            }) as { data?: { fieldConfigDelete: FieldConfigPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            fieldConfig: response.data?.fieldConfigDelete?.fieldConfig as FieldConfig | undefined,
            userErrors: response.data?.fieldConfigDelete?.userErrors,
          }
        },
      )

      // User should be forbidden (tested first)
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.fieldConfig).toBeTruthy()
      expect(results.admin.fieldConfig?.id).toBe(deleteTestFieldConfigId)
      expect(results.admin.userErrors).toHaveLength(0)

      // Verify the field config was actually deleted
      const deletedConfig = await globalThis.prisma.tbl_field_config.findUnique({
        where: { id: deleteTestFieldConfigId },
      })
      expect(deletedConfig).toBeNull()

      deleteTestFieldConfigId = undefined // Prevent cleanup attempt
    })

    it('Should handle delete of non-existent field config: admin gets userError, user forbidden', async () => {
      const results = await testWithBothRoles(
        'delete non-existent field config',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteFieldConfig($fieldConfigId: Int!) {
                fieldConfigDelete(fieldConfigID: $fieldConfigId) {
                  userErrors {
                    message
                    field
                  }
                  fieldConfig {
                    id
                  }
                }
              }
            `, {
              fieldConfigId: 99999,
            }) as { data?: { fieldConfigDelete: FieldConfigPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            fieldConfig: response.data?.fieldConfigDelete?.fieldConfig as FieldConfig | undefined,
            userErrors: response.data?.fieldConfigDelete?.userErrors,
          }
        },
      )

      // Admin is authorized but should get userError
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.userErrors).toBeDefined()
      expect(results.admin.userErrors!.length).toBeGreaterThan(0)
      expect(results.admin.userErrors![0].message).toContain('not found')
      expect(results.admin.fieldConfig).toBeNull()

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
    })

    it('Should handle delete with invalid ID: both roles get GraphQL errors', async () => {
      const results = await testWithBothRoles(
        'delete with invalid ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteFieldConfig($fieldConfigId: Int!) {
                fieldConfigDelete(fieldConfigID: $fieldConfigId) {
                  userErrors {
                    message
                    field
                  }
                  fieldConfig {
                    id
                  }
                }
              }
            `, {
              fieldConfigId: null,
            }) as { data?: { fieldConfigDelete: FieldConfigPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
          }
        },
      )

      // Both roles should get GraphQL validation errors
      expect(results.admin.hasErrors).toBe(true)
      expect(results.user.hasErrors).toBe(true)
    })
  })

  describe('Authentication and Authorization', () => {
    it('Should require authentication for all operations', async () => {
      const response = await createAuthenticatedRequest('user')
        .set('Cookie', '') // Remove authentication
        .query(gql`
          query FieldConfigs {
            fieldConfigs {
              id
              tableName
              fieldName
            }
          }
        `) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0].message).toContain('Unauthorized')
    })
  })
})
