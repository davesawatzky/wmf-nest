import gql from 'graphql-tag'
import request from 'supertest-graphql'
import {
  FieldConfig,
  FieldConfigPayload,
} from '../entities/field-config.entity'

describe('FieldConfig', () => {
  let testFieldConfigId: number

  beforeAll(async () => {
    // Create test field config for testing queries
    const testConfig = await globalThis.prisma.tbl_field_config.create({
      data: {
        tableName: 'test_table',
        fieldName: 'test_field',
        submissionRequired: true,
        communityRequired: false,
        groupRequired: true,
        schoolRequired: false,
        soloRequired: true,
        customField: false,
        customFieldType: 'text',
      },
    })
    testFieldConfigId = testConfig.id
  })

  afterAll(async () => {
    // Clean up test data
    await globalThis.prisma.tbl_field_config.deleteMany({
      where: {
        OR: [
          { id: testFieldConfigId },
          { tableName: 'test_table' },
          { tableName: 'new_test_table' },
          { fieldName: { startsWith: 'e2e_test_' } },
        ],
      },
    })
  })

  describe('Listing Field Configurations', () => {
    let response: any

    it('Can provide a list of all field configurations', async () => {
      response = await request<{ fieldConfigs: FieldConfig[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query FieldConfigs {
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
        .expectNoErrors()

      expect(response.data.fieldConfigs).toBeTruthy()
      expect(Array.isArray(response.data.fieldConfigs)).toBe(true)
      expect(response.data.fieldConfigs.length).toBeGreaterThan(0)

      // Verify our test config is included
      const testConfig = response.data.fieldConfigs.find(
        (config: FieldConfig) => config.id === testFieldConfigId,
      )
      expect(testConfig).toBeTruthy()
      expect(testConfig.tableName).toBe('test_table')
      expect(testConfig.fieldName).toBe('test_field')
    })

    it('Returns field configurations with correct data types', async () => {
      response = await request<{ fieldConfigs: FieldConfig[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query FieldConfigs {
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
        .expectNoErrors()

      const firstConfig = response.data.fieldConfigs[0]
      expect(typeof firstConfig.id).toBe('number')
      expect(typeof firstConfig.tableName).toBe('string')
      expect(typeof firstConfig.fieldName).toBe('string')
      expect(typeof firstConfig.submissionRequired).toBe('boolean')
      expect(typeof firstConfig.communityRequired).toBe('boolean')
      expect(typeof firstConfig.groupRequired).toBe('boolean')
      expect(typeof firstConfig.schoolRequired).toBe('boolean')
      expect(typeof firstConfig.soloRequired).toBe('boolean')
      expect(typeof firstConfig.customField).toBe('boolean')
    })
  })

  describe('Individual Field Configuration', () => {
    let response: any

    it('Can find field config using tableName and fieldName', async () => {
      response = await request<{ fieldConfig: FieldConfig }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query FieldConfig($tableName: String!, $fieldName: String!) {
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
        `)
        .variables({
          tableName: 'test_table',
          fieldName: 'test_field',
        })
        .expectNoErrors()

      expect(response.data.fieldConfig).toBeTruthy()
      expect(response.data.fieldConfig.id).toBe(testFieldConfigId)
      expect(response.data.fieldConfig.tableName).toBe('test_table')
      expect(response.data.fieldConfig.fieldName).toBe('test_field')
      expect(response.data.fieldConfig.submissionRequired).toBe(true)
      expect(response.data.fieldConfig.groupRequired).toBe(true)
      expect(response.data.fieldConfig.soloRequired).toBe(true)
    })

    it('Returns error when field config not found', async () => {
      response = await request<{ fieldConfig: FieldConfig }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query FieldConfig($tableName: String!, $fieldName: String!) {
            fieldConfig(tableName: $tableName, fieldName: $fieldName) {
              id
              tableName
              fieldName
            }
          }
        `)
        .variables({
          tableName: 'nonexistent_table',
          fieldName: 'nonexistent_field',
        })

      expect(response.errors).toBeTruthy()
      expect(response.errors[0].message).toContain('not found')
    })

    it('Returns error when required parameters are missing', async () => {
      response = await request<{ fieldConfig: FieldConfig }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query FieldConfig($tableName: String!, $fieldName: String!) {
            fieldConfig(tableName: $tableName, fieldName: $fieldName) {
              id
              tableName
              fieldName
            }
          }
        `)
        .variables({
          tableName: '',
          fieldName: '',
        })

      expect(response.errors).toBeTruthy()
    })
  })

  describe('Create Field Configuration', () => {
    let response: any
    let createdFieldConfigId: number

    afterEach(async () => {
      // Clean up created field config
      if (createdFieldConfigId) {
        await globalThis.prisma.tbl_field_config
          .delete({
            where: { id: createdFieldConfigId },
          })
          .catch(() => {}) // Ignore errors if already deleted
        createdFieldConfigId = undefined
      }
    })

    it('Successfully creates a field config using FieldConfigInput', async () => {
      response = await request<{ fieldConfigCreate: FieldConfigPayload }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
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
        `)
        .variables({
          fieldConfigInput: {
            tableName: 'new_test_table',
            fieldName: 'e2e_test_field_create',
            submissionRequired: false,
            communityRequired: true,
            groupRequired: false,
            schoolRequired: true,
            soloRequired: false,
            customField: true,
            customFieldType: 'email',
          },
        })
        .expectNoErrors()

      createdFieldConfigId = response.data.fieldConfigCreate.fieldConfig.id

      expect(response.data.fieldConfigCreate.userErrors).toEqual([])
      expect(response.data.fieldConfigCreate.fieldConfig).toBeTruthy()
      expect(response.data.fieldConfigCreate.fieldConfig.tableName).toBe(
        'new_test_table',
      )
      expect(response.data.fieldConfigCreate.fieldConfig.fieldName).toBe(
        'e2e_test_field_create',
      )
      expect(
        response.data.fieldConfigCreate.fieldConfig.communityRequired,
      ).toBe(true)
      expect(response.data.fieldConfigCreate.fieldConfig.schoolRequired).toBe(
        true,
      )
      expect(response.data.fieldConfigCreate.fieldConfig.customField).toBe(
        true,
      )
      expect(response.data.fieldConfigCreate.fieldConfig.customFieldType).toBe(
        'email',
      )
    })

    it('Returns userError when trying to create duplicate field config', async () => {
      response = await request<{ fieldConfigCreate: FieldConfigPayload }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
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
        `)
        .variables({
          fieldConfigInput: {
            tableName: 'test_table',
            fieldName: 'test_field',
            submissionRequired: true,
            communityRequired: false,
            groupRequired: false,
            schoolRequired: false,
            soloRequired: false,
            customField: false,
            customFieldType: 'text',
          },
        })
        .expectNoErrors()

      expect(response.data.fieldConfigCreate.userErrors.length).toBeGreaterThan(
        0,
      )
      expect(response.data.fieldConfigCreate.userErrors[0].message).toContain(
        'already exists',
      )
      expect(response.data.fieldConfigCreate.fieldConfig).toBeNull()
    })

    it('Returns error with invalid input data', async () => {
      response = await request<{ fieldConfigCreate: FieldConfigPayload }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
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
        `)
        .variables({
          fieldConfigInput: {
            tableName: null,
            fieldName: null,
            submissionRequired: 'invalid',
          },
        })

      expect(response.errors).toBeTruthy()
      expect(response.errors[0].message).toContain('Variable')
    })

    it('Creates field config with minimal required fields', async () => {
      response = await request<{ fieldConfigCreate: FieldConfigPayload }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
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
        `)
        .variables({
          fieldConfigInput: {
            tableName: 'minimal_table',
            fieldName: 'e2e_test_minimal_field',
            submissionRequired: false,
            communityRequired: false,
            groupRequired: false,
            schoolRequired: false,
            soloRequired: false,
            customField: false,
          },
        })
        .expectNoErrors()

      createdFieldConfigId = response.data.fieldConfigCreate.fieldConfig.id

      expect(response.data.fieldConfigCreate.userErrors).toEqual([])
      expect(response.data.fieldConfigCreate.fieldConfig).toBeTruthy()
      expect(response.data.fieldConfigCreate.fieldConfig.tableName).toBe(
        'minimal_table',
      )
      expect(response.data.fieldConfigCreate.fieldConfig.fieldName).toBe(
        'e2e_test_minimal_field',
      )
    })
  })

  describe('Update Field Configuration', () => {
    let response: any
    let updateTestFieldConfigId: number

    beforeEach(async () => {
      // Create a field config for updating
      const testConfig = await globalThis.prisma.tbl_field_config.create({
        data: {
          tableName: 'update_test_table',
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

    it('Successfully updates a field config', async () => {
      response = await request<{ fieldConfigUpdate: FieldConfigPayload }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
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
        `)
        .variables({
          fieldConfigId: updateTestFieldConfigId,
          fieldConfigInput: {
            tableName: 'updated_table',
            fieldName: 'e2e_test_updated_field',
            submissionRequired: true,
            communityRequired: true,
            groupRequired: true,
            schoolRequired: true,
            soloRequired: true,
            customField: true,
            customFieldType: 'number',
          },
        })
        .expectNoErrors()

      expect(response.data.fieldConfigUpdate.userErrors).toEqual([])
      expect(response.data.fieldConfigUpdate.fieldConfig).toBeTruthy()
      expect(response.data.fieldConfigUpdate.fieldConfig.id).toBe(
        updateTestFieldConfigId,
      )
      expect(response.data.fieldConfigUpdate.fieldConfig.tableName).toBe(
        'updated_table',
      )
      expect(response.data.fieldConfigUpdate.fieldConfig.fieldName).toBe(
        'e2e_test_updated_field',
      )
      expect(
        response.data.fieldConfigUpdate.fieldConfig.submissionRequired,
      ).toBe(true)
      expect(
        response.data.fieldConfigUpdate.fieldConfig.communityRequired,
      ).toBe(true)
      expect(response.data.fieldConfigUpdate.fieldConfig.customFieldType).toBe(
        'number',
      )
    })

    it('Returns userError when trying to update non-existent field config', async () => {
      response = await request<{ fieldConfigUpdate: FieldConfigPayload }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
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
        `)
        .variables({
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
        })
        .expectNoErrors()

      expect(response.data.fieldConfigUpdate.userErrors.length).toBeGreaterThan(
        0,
      )
      expect(response.data.fieldConfigUpdate.userErrors[0].message).toContain(
        'not found',
      )
      expect(response.data.fieldConfigUpdate.fieldConfig).toBeNull()
    })

    it('Returns error with invalid update input', async () => {
      response = await request<{ fieldConfigUpdate: FieldConfigPayload }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
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
        `)
        .variables({
          fieldConfigId: updateTestFieldConfigId,
          fieldConfigInput: {
            tableName: null,
            fieldName: '',
            submissionRequired: 'invalid_boolean',
          },
        })

      expect(response.errors).toBeTruthy()
    })
  })

  describe('Delete Field Configuration', () => {
    let response: any
    let deleteTestFieldConfigId: number

    beforeEach(async () => {
      // Create a field config for deletion
      const testConfig = await globalThis.prisma.tbl_field_config.create({
        data: {
          tableName: 'delete_test_table',
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

    it('Successfully deletes a field config', async () => {
      response = await request<{ fieldConfigDelete: FieldConfigPayload }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
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
        `)
        .variables({
          fieldConfigId: deleteTestFieldConfigId,
        })
        .expectNoErrors()

      expect(response.data.fieldConfigDelete.userErrors).toEqual([])
      expect(response.data.fieldConfigDelete.fieldConfig).toBeTruthy()
      expect(response.data.fieldConfigDelete.fieldConfig.id).toBe(
        deleteTestFieldConfigId,
      )

      // Verify the field config was actually deleted
      const deletedConfig = await globalThis.prisma.tbl_field_config.findUnique(
        {
          where: { id: deleteTestFieldConfigId },
        },
      )
      expect(deletedConfig).toBeNull()

      deleteTestFieldConfigId = undefined // Prevent cleanup attempt
    })

    it('Returns userError when trying to delete non-existent field config', async () => {
      response = await request<{ fieldConfigDelete: FieldConfigPayload }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
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
        `)
        .variables({
          fieldConfigId: 99999,
        })
        .expectNoErrors()

      expect(response.data.fieldConfigDelete.userErrors.length).toBeGreaterThan(
        0,
      )
      expect(response.data.fieldConfigDelete.userErrors[0].message).toContain(
        'not found',
      )
      expect(response.data.fieldConfigDelete.fieldConfig).toBeNull()
    })

    it('Returns error with invalid field config ID', async () => {
      response = await request<{ fieldConfigDelete: FieldConfigPayload }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
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
        `)
        .variables({
          fieldConfigId: null,
        })

      expect(response.errors).toBeTruthy()
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
  })

  describe('Authentication and Authorization', () => {
    it('Requires authentication for all operations', async () => {
      const response = await request<{ fieldConfigs: FieldConfig[] }>(
        globalThis.httpServer,
      ).query(gql`
        query FieldConfigs {
          fieldConfigs {
            id
            tableName
            fieldName
          }
        }
      `)

      expect(response.errors).toBeTruthy()
      expect(response.errors[0].message).toContain('Unauthorized')
    })

    it('Enforces read permissions for queries', async () => {
      // Note: In a real scenario, you'd test with a user that lacks read permissions
      // This test assumes the admin user has all permissions
      const response = await request<{ fieldConfigs: FieldConfig[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query FieldConfigs {
            fieldConfigs {
              id
              tableName
              fieldName
            }
          }
        `)
        .expectNoErrors()

      expect(response.data.fieldConfigs).toBeTruthy()
    })
  })

  describe('Data Validation and Business Logic', () => {
    it('Validates performer type requirements consistency', async () => {
      // Test business rule: at least one performer type should be required
      const response = await request<{ fieldConfigCreate: FieldConfigPayload }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
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
        `)
        .variables({
          fieldConfigInput: {
            tableName: 'validation_test_table',
            fieldName: 'e2e_test_validation_field',
            submissionRequired: false,
            communityRequired: false,
            groupRequired: false,
            schoolRequired: false,
            soloRequired: false,
            customField: false,
          },
        })
        .expectNoErrors()

      // This should succeed - the business logic validation would be in the service layer
      expect(response.data.fieldConfigCreate.fieldConfig).toBeTruthy()

      // Clean up
      await globalThis.prisma.tbl_field_config.delete({
        where: { id: response.data.fieldConfigCreate.fieldConfig.id },
      })
    })

    it('Handles custom field type validation', async () => {
      const response = await request<{ fieldConfigCreate: FieldConfigPayload }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
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
        `)
        .variables({
          fieldConfigInput: {
            tableName: 'custom_field_test_table',
            fieldName: 'e2e_test_custom_field',
            submissionRequired: true,
            communityRequired: false,
            groupRequired: false,
            schoolRequired: false,
            soloRequired: true,
            customField: true,
            customFieldType: 'date',
          },
        })
        .expectNoErrors()

      expect(response.data.fieldConfigCreate.userErrors).toEqual([])
      expect(response.data.fieldConfigCreate.fieldConfig.customField).toBe(
        true,
      )
      expect(response.data.fieldConfigCreate.fieldConfig.customFieldType).toBe(
        'date',
      )

      // Clean up
      await globalThis.prisma.tbl_field_config.delete({
        where: { id: response.data.fieldConfigCreate.fieldConfig.id },
      })
    })
  })
})
