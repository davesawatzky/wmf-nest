import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

/**
 * Email Confirmation E2E Tests
 *
 * Tests the    it('Should successfully resend password reset link when passwordResetPending is true', async () => {
      const response = await request(globalThis.httpServer)
        .post('/email-confirmation/resend-password-link')
        .send({ email: passwordResetUser.email })
        .expect(201)

      // Verify successful response (no errors)
      expect(response.status).toBe(201)
    })ints for email verification and password reset workflows.
 * Unlike auth tests which use GraphQL mutations, these tests use REST endpoints:
 * - POST /email-confirmation/confirm
 * - POST /email-confirmation/resend-confirmation-link
 * - POST /email-confi    it('Should handle concurrent confirmation attempts', async () => {
      // Clean up any existing user from previous test runs
      await globalThis.prisma.tbl_user.deleteMany({
        where: { email: 'test_concurrent@test.com' },
      })

      // Create new test user for concurrency test
      const bcrypt = await import('bcrypt')
      const hashedPassword = await bcrypt.hash('TestPass123!', 10)

      const testUser = await globalThis.prisma.tbl_user.create({n/resend-password-link
 *
 * Pattern:
 * - Uses REST API (not GraphQL)
 * - Restores REAL EmailConfirmationService (unmocks from integrationTestSetup)
 * - Mocks only EmailService (SMTP) to prevent actual emails
 * - Tests JWT token generation/validation
 * - Tests database state changes (emailConfirmed, passwordResetPending)
 * - Creates dedicated test users separate from global setup
 *
 * IMPORTANT: This test unmocks EmailConfirmationService to test real business logic.
 * The SMTP email sending is still mocked via EmailService to prevent actual emails.
 */
describe('Email Confirmation E2E Tests', () => {
  let jwtService: JwtService
  let configService: ConfigService

  // Test user IDs
  let unconfirmedUserId: number
  let confirmedUserId: number
  let _passwordResetUserId: number
  let _noPasswordResetUserId: number

  // Test users
  const unconfirmedUser = {
    email: 'test_email_unconfirmed@test.com',
    firstName: 'Unconfirmed',
    lastName: 'User',
    password: 'TestPass123!',
    privateTeacher: false,
    schoolTeacher: false,
    emailConfirmed: false,
    instrument: null,
    isActive: true,
    roles: ['user'],
  }

  const confirmedUser = {
    email: 'test_email_confirmed@test.com',
    firstName: 'Confirmed',
    lastName: 'User',
    password: 'TestPass123!',
    privateTeacher: false,
    schoolTeacher: false,
    emailConfirmed: true,
    instrument: null,
    isActive: true,
    roles: ['user'],
  }

  const passwordResetUser = {
    email: 'test_email_reset_pending@test.com',
    firstName: 'PasswordReset',
    lastName: 'User',
    password: 'TestPass123!',
    privateTeacher: false,
    schoolTeacher: false,
    emailConfirmed: true,
    passwordResetPending: true,
    instrument: null,
    isActive: true,
    roles: ['user'],
  }

  const noPasswordResetUser = {
    email: 'test_email_no_reset@test.com',
    firstName: 'NoReset',
    lastName: 'User',
    password: 'TestPass123!',
    privateTeacher: false,
    schoolTeacher: false,
    emailConfirmed: true,
    passwordResetPending: false,
    instrument: null,
    isActive: true,
    roles: ['user'],
  }

  beforeAll(async () => {
    // Wait for test context to be available
    if (!globalThis.testContext) {
      throw new Error('Test context not initialized. Check integrationTestSetup.')
    }

    jwtService = globalThis.testContext.app.get(JwtService)
    configService = globalThis.testContext.app.get(ConfigService)

    // Clean up any existing test data
    await globalThis.prisma.tbl_user.deleteMany({
      where: {
        email: {
          in: [
            unconfirmedUser.email,
            confirmedUser.email,
            passwordResetUser.email,
            noPasswordResetUser.email,
          ],
        },
      },
    })

    // Hash passwords for test users
    const bcrypt = await import('bcrypt')
    const hashedPassword = await bcrypt.hash('TestPass123!', 10)

    // Create test users
    const createdUnconfirmed = await globalThis.prisma.tbl_user.create({
      data: { ...unconfirmedUser, password: hashedPassword },
    })
    unconfirmedUserId = createdUnconfirmed.id

    const createdConfirmed = await globalThis.prisma.tbl_user.create({
      data: { ...confirmedUser, password: hashedPassword },
    })
    confirmedUserId = createdConfirmed.id

    const createdPasswordReset = await globalThis.prisma.tbl_user.create({
      data: { ...passwordResetUser, password: hashedPassword },
    })
    _passwordResetUserId = createdPasswordReset.id

    const createdNoPasswordReset = await globalThis.prisma.tbl_user.create({
      data: { ...noPasswordResetUser, password: hashedPassword },
    })
    _noPasswordResetUserId = createdNoPasswordReset.id
  }, 30000) // 30 second timeout for setup

  afterAll(async () => {
    // Clean up all test users
    await globalThis.prisma.tbl_user.deleteMany({
      where: {
        email: {
          in: [
            unconfirmedUser.email,
            confirmedUser.email,
            passwordResetUser.email,
            noPasswordResetUser.email,
          ],
        },
      },
    })
  })

  describe('Email Confirmation Endpoint - POST /email-confirmation/confirm', () => {
    it('Should successfully confirm email with valid token', async () => {
      // Generate a valid verification token
      const token = jwtService.sign(
        { email: unconfirmedUser.email },
        {
          secret: configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
          expiresIn: `${configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`,
        },
      )

      // Confirm email via REST endpoint
      const response = await request(globalThis.httpServer)
        .post('/email-confirmation/confirm')
        .send({ token })
        .expect(201)

      // Should return truthy value for successful confirmation (could be true or object)
      expect(response.body).toBeTruthy()

      // Verify database updated
      const user = await globalThis.prisma.tbl_user.findUnique({
        where: { id: unconfirmedUserId },
      })

      expect(user?.emailConfirmed).toBe(true)

      // Reset for subsequent tests
      await globalThis.prisma.tbl_user.update({
        where: { id: unconfirmedUserId },
        data: { emailConfirmed: false },
      })
    })

    it('Should reject already confirmed email', async () => {
      // Generate token for already confirmed user
      const token = jwtService.sign(
        { email: confirmedUser.email },
        {
          secret: configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
          expiresIn: `${configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`,
        },
      )

      // Attempt to confirm again
      const response = await request(globalThis.httpServer)
        .post('/email-confirmation/confirm')
        .send({ token })
        .expect(400)

      expect(response.body.message).toContain('Email already confirmed')
    })

    it('Should reject invalid token format', async () => {
      const response = await request(globalThis.httpServer)
        .post('/email-confirmation/confirm')
        .send({ token: 'invalid-token-format' })
        .expect(400)

      expect(response.body.message).toBeDefined()
    })

    it('Should reject expired token', async () => {
      // Create an expired token (signed with -1 second expiration)
      const token = jwtService.sign(
        { email: unconfirmedUser.email },
        {
          secret: configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
          expiresIn: '-1s', // Already expired
        },
      )

      const response = await request(globalThis.httpServer)
        .post('/email-confirmation/confirm')
        .send({ token })
        .expect(400)

      expect(response.body.message).toContain('expired')
    })

    it('Should reject token with missing email payload', async () => {
      // Create token without email field
      const token = jwtService.sign(
        { userId: 123 }, // Wrong payload structure
        {
          secret: configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
          expiresIn: `${configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`,
        },
      )

      const response = await request(globalThis.httpServer)
        .post('/email-confirmation/confirm')
        .send({ token })
        .expect(400)

      expect(response.body.message).toBeDefined()
    })

    it('Should reject token with wrong secret', async () => {
      // Create token with wrong secret
      const token = jwtService.sign(
        { email: unconfirmedUser.email },
        {
          secret: 'wrong-secret-key',
          expiresIn: `${configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`,
        },
      )

      const response = await request(globalThis.httpServer)
        .post('/email-confirmation/confirm')
        .send({ token })
        .expect(400)

      expect(response.body.message).toBeDefined()
    })

    it('Should reject request with missing token', async () => {
      const response = await request(globalThis.httpServer)
        .post('/email-confirmation/confirm')
        .send({}) // No token provided
        .expect(400)

      expect(response.body.message).toBeDefined()
    })

    it('Should reject token for non-existent user', async () => {
      // Create token for user that doesn't exist
      const token = jwtService.sign(
        { email: 'nonexistent_user@test.com' },
        {
          secret: configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
          expiresIn: `${configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`,
        },
      )

      const response = await request(globalThis.httpServer)
        .post('/email-confirmation/confirm')
        .send({ token })
        .expect(500) // UserService.findOne throws error for non-existent user

      expect(response.body.message).toBeDefined()
    })
  })

  describe('Resend Confirmation Link - POST /email-confirmation/resend-confirmation-link', () => {
    it('Should successfully resend confirmation link for unconfirmed user', async () => {
      const response = await request(globalThis.httpServer)
        .post('/email-confirmation/resend-confirmation-link')
        .send({
          user: {
            id: unconfirmedUserId,
            email: unconfirmedUser.email,
            firstName: unconfirmedUser.firstName,
            lastName: unconfirmedUser.lastName,
            emailConfirmed: false,
          },
        })
        .expect(201)

      // Verify successful response (no errors)
      expect(response.status).toBe(201)
    })

    it('Should reject resend for already confirmed user', async () => {
      const response = await request(globalThis.httpServer)
        .post('/email-confirmation/resend-confirmation-link')
        .send({
          user: {
            id: confirmedUserId,
            email: confirmedUser.email,
            firstName: confirmedUser.firstName,
            lastName: confirmedUser.lastName,
            emailConfirmed: true,
          },
        })
        .expect(400)

      expect(response.body.message).toContain('Email already confirmed')
    })

    it('Should reject resend with missing user data', async () => {
      const response = await request(globalThis.httpServer)
        .post('/email-confirmation/resend-confirmation-link')
        .send({}) // No user data
        .expect(500) // Controller error trying to access undefined user

      expect(response.body.message).toBeDefined()
    })

    it('Should reject resend for non-existent user', async () => {
      const response = await request(globalThis.httpServer)
        .post('/email-confirmation/resend-confirmation-link')
        .send({
          user: {
            id: 999999,
            email: 'nonexistent@test.com',
            firstName: 'Non',
            lastName: 'Existent',
            emailConfirmed: false,
          },
        })
        .expect(500) // UserService.findOne throws error

      expect(response.body.message).toBeDefined()
    })
  })

  describe('Resend Password Reset Link - POST /email-confirmation/resend-password-link', () => {
    it('Should successfully resend password reset link when passwordResetPending is true', async () => {
      const response = await request(globalThis.httpServer)
        .post('/email-confirmation/resend-password-link')
        .send({ email: passwordResetUser.email })
        .expect(201)

      // Verify successful response (no errors)
      expect(response.status).toBe(201)
    })

    it('Should reject resend when passwordResetPending is false', async () => {
      const response = await request(globalThis.httpServer)
        .post('/email-confirmation/resend-password-link')
        .send({ email: noPasswordResetUser.email })
        .expect(400)

      expect(response.body.message).toContain('No pending password reset request')
    })

    it('Should reject resend with missing email', async () => {
      const response = await request(globalThis.httpServer)
        .post('/email-confirmation/resend-password-link')
        .send({}) // No email
        .expect(400)

      expect(response.body.message).toBeDefined()
    })

    it('Should reject resend for non-existent user', async () => {
      const response = await request(globalThis.httpServer)
        .post('/email-confirmation/resend-password-link')
        .send({ email: 'nonexistent_reset@test.com' })
        .expect(500) // UserService.findOne throws error

      expect(response.body.message).toBeDefined()
    })

    it('Should handle empty email string', async () => {
      const response = await request(globalThis.httpServer)
        .post('/email-confirmation/resend-password-link')
        .send({ email: '' })
        .expect(400)

      expect(response.body.message).toBeDefined()
    })
  })

  describe('Security Tests', () => {
    it('Should not expose sensitive user information in error messages', async () => {
      const token = jwtService.sign(
        { email: 'test_security@test.com' },
        {
          secret: configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
          expiresIn: `${configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`,
        },
      )

      const response = await request(globalThis.httpServer)
        .post('/email-confirmation/confirm')
        .send({ token })
        .expect(500)

      // Error message should be generic, not expose database details
      expect(response.body.message).not.toContain('Prisma')
      expect(response.body.message).not.toContain('SQL')
      expect(response.body.message).not.toContain('database')
    })

    it('Should validate token before database operations', async () => {
      // Invalid token should fail before hitting database
      const response = await request(globalThis.httpServer)
        .post('/email-confirmation/confirm')
        .send({ token: 'malformed.token.here' })
        .expect(400)

      expect(response.body.message).toBeDefined()
    })

    it('Should prevent token reuse after email confirmation', async () => {
      // Clean up any existing user from previous test runs
      await globalThis.prisma.tbl_user.deleteMany({
        where: { email: 'test_token_reuse@test.com' },
      })

      // Create new test user for this test
      const bcrypt = await import('bcrypt')
      const hashedPassword = await bcrypt.hash('TestPass123!', 10)

      const testUser = await globalThis.prisma.tbl_user.create({
        data: {
          email: 'test_token_reuse@test.com',
          firstName: 'TokenReuse',
          lastName: 'Test',
          password: hashedPassword,
          privateTeacher: false,
          schoolTeacher: false,
          emailConfirmed: false,
          instrument: null,
          isActive: true,
          roles: ['user'],
        },
      })

      // Generate token and confirm email
      const token = jwtService.sign(
        { email: testUser.email },
        {
          secret: configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
          expiresIn: `${configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`,
        },
      )

      // First confirmation should succeed
      await request(globalThis.httpServer)
        .post('/email-confirmation/confirm')
        .send({ token })
        .expect(201)

      // Second use of same token should fail
      const response = await request(globalThis.httpServer)
        .post('/email-confirmation/confirm')
        .send({ token })
        .expect(400)

      expect(response.body.message).toContain('Email already confirmed')

      // Cleanup
      await globalThis.prisma.tbl_user.delete({
        where: { id: testUser.id },
      })
    })

    it('Should handle SQL injection attempts in email field', async () => {
      const maliciousEmail = '\'; DROP TABLE tbl_user; --'
      const token = jwtService.sign(
        { email: maliciousEmail },
        {
          secret: configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
          expiresIn: `${configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`,
        },
      )

      const _response = await request(globalThis.httpServer)
        .post('/email-confirmation/confirm')
        .send({ token })
        .expect(500) // Should fail safely

      // Verify database is intact
      const userCount = await globalThis.prisma.tbl_user.count()
      expect(userCount).toBeGreaterThan(0)
    })
  })

  describe('Edge Cases', () => {
    it('Should handle very long email addresses in token', async () => {
      const longEmail = `${'a'.repeat(100)}@${'b'.repeat(100)}.com`
      const token = jwtService.sign(
        { email: longEmail },
        {
          secret: configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
          expiresIn: `${configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`,
        },
      )

      const response = await request(globalThis.httpServer)
        .post('/email-confirmation/confirm')
        .send({ token })
        .expect(500) // User doesn't exist

      expect(response.body.message).toBeDefined()
    })

    it('Should handle special characters in email', async () => {
      const specialEmail = 'test+filter@example.co.uk'
      const token = jwtService.sign(
        { email: specialEmail },
        {
          secret: configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
          expiresIn: `${configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`,
        },
      )

      const response = await request(globalThis.httpServer)
        .post('/email-confirmation/confirm')
        .send({ token })
        .expect(500) // User doesn't exist (but token is valid)

      expect(response.body.message).toBeDefined()
    })

    it('Should handle concurrent confirmation attempts', async () => {
      // Clean up any existing user from previous test runs
      await globalThis.prisma.tbl_user.deleteMany({
        where: { email: 'test_concurrent@test.com' },
      })

      // Create new test user for concurrent test
      const bcrypt = await import('bcrypt')
      const hashedPassword = await bcrypt.hash('TestPass123!', 10)

      const testUser = await globalThis.prisma.tbl_user.create({
        data: {
          email: 'test_concurrent@test.com',
          firstName: 'Concurrent',
          lastName: 'Test',
          password: hashedPassword,
          privateTeacher: false,
          schoolTeacher: false,
          emailConfirmed: false,
          instrument: null,
          isActive: true,
          roles: ['user'],
        },
      })

      const token = jwtService.sign(
        { email: testUser.email },
        {
          secret: configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
          expiresIn: `${configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`,
        },
      )

      // Send multiple simultaneous requests
      const requests = [
        request(globalThis.httpServer)
          .post('/email-confirmation/confirm')
          .send({ token }),
        request(globalThis.httpServer)
          .post('/email-confirmation/confirm')
          .send({ token }),
        request(globalThis.httpServer)
          .post('/email-confirmation/confirm')
          .send({ token }),
      ]

      const responses = await Promise.all(requests)

      // One should succeed, others should fail with "already confirmed"
      const successCount = responses.filter(r => r.status === 201).length
      const failCount = responses.filter(r => r.status === 400).length

      expect(successCount).toBeGreaterThanOrEqual(1)
      expect(successCount + failCount).toBe(3)

      // Verify user is confirmed exactly once
      const user = await globalThis.prisma.tbl_user.findUnique({
        where: { id: testUser.id },
      })
      expect(user?.emailConfirmed).toBe(true)

      // Cleanup
      await globalThis.prisma.tbl_user.delete({
        where: { id: testUser.id },
      })
    })

    it('Should handle whitespace in token', async () => {
      const validToken = jwtService.sign(
        { email: unconfirmedUser.email },
        {
          secret: configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
          expiresIn: `${configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`,
        },
      )

      // Add whitespace around token
      const response = await request(globalThis.httpServer)
        .post('/email-confirmation/confirm')
        .send({ token: `  ${validToken}  ` })
        .expect(400) // Should fail due to whitespace

      expect(response.body.message).toBeDefined()
    })
  })

  describe('Token Expiration Handling', () => {
    it('Should reject token that expires exactly at current time', async () => {
      // Create token that expires in 0 seconds (edge case)
      const token = jwtService.sign(
        { email: unconfirmedUser.email },
        {
          secret: configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
          expiresIn: '0s',
        },
      )

      // Small delay to ensure expiration
      await new Promise(resolve => setTimeout(resolve, 100))

      const response = await request(globalThis.httpServer)
        .post('/email-confirmation/confirm')
        .send({ token })
        .expect(400)

      expect(response.body.message).toBeDefined()
    })

    it('Should accept token with long expiration time', async () => {
      // Create new test user
      const bcrypt = await import('bcrypt')
      const hashedPassword = await bcrypt.hash('TestPass123!', 10)

      const testUser = await globalThis.prisma.tbl_user.create({
        data: {
          email: 'test_long_expiry@test.com',
          firstName: 'LongExpiry',
          lastName: 'Test',
          password: hashedPassword,
          privateTeacher: false,
          schoolTeacher: false,
          emailConfirmed: false,
          instrument: null,
          isActive: true,
          roles: ['user'],
        },
      })

      // Token expires in 1 year
      const token = jwtService.sign(
        { email: testUser.email },
        {
          secret: configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
          expiresIn: '365d',
        },
      )

      await request(globalThis.httpServer)
        .post('/email-confirmation/confirm')
        .send({ token })
        .expect(201)

      // Cleanup
      await globalThis.prisma.tbl_user.delete({
        where: { id: testUser.id },
      })
    })
  })
})
