import { vi } from 'vitest'

import type { EmailConfirmationService } from '@/email-confirmation/email-confirmation.service.js'

/**
 * Mock implementation of EmailConfirmationService for E2E testing.
 *
 * This mock prevents actual SMTP emails while preserving business logic validation. All methods match the real service
 * return types and validate inputs appropriately.
 *
 * Mock behaviors:
 *
 * - SendVerificationLink: void (async, no return) - validates inputs, prevents SMTP
 * - SendPasswordResetLink: void (async, no return) - validates inputs, prevents SMTP
 * - ConfirmEmail: Promise<boolean> - validates user state and updates database
 * - ResendConfirmationLink: void (async, no return) - validates user state
 * - ResendPasswordLink: void (async, no return) - validates passwordResetPending flag
 *
 * All database operations use lazy evaluation to access globalThis.prisma at runtime.
 */
export function createMockEmailConfirmationService(): Partial<EmailConfirmationService> {
  return {
    sendVerificationLink: vi.fn().mockImplementation(async (userName: string, email: string) => {
      // Validate inputs like real service
      const { BadRequestException } = await import('@nestjs/common')
      if (!userName) {
        throw new BadRequestException('User name is required')
      }
      if (!email) {
        throw new BadRequestException('Email is required')
      }
      // Skip actual SMTP email sending
      return undefined // void return
    }),

    sendPasswordResetLink: vi.fn().mockImplementation(async (email: string) => {
      // Validate inputs like real service
      const { BadRequestException } = await import('@nestjs/common')
      if (!email) {
        throw new BadRequestException('Email is required')
      }
      // Skip actual SMTP email sending
      return undefined // void return
    }),

    confirmEmail: vi.fn().mockImplementation(async (email: string) => {
      // Mock implementation that actually updates the database
      // Lazy access to globalThis.prisma (available at runtime, not at definition time)
      const { BadRequestException } = await import('@nestjs/common')
      if (!email) {
        throw new BadRequestException('Email is required')
      }
      if (!globalThis.prisma) {
        throw new Error('Prisma not initialized in test context')
      }
      const user = await globalThis.prisma.tbl_user.findUnique({ where: { email } })
      if (!user) {
        throw new Error('User not found')
      }
      if (user.emailConfirmed) {
        throw new BadRequestException('Email already confirmed')
      }
      await globalThis.prisma.tbl_user.update({
        where: { email },
        data: { emailConfirmed: true },
      })
      return true // Returns boolean
    }),

    resendConfirmationLink: vi.fn().mockImplementation(async (userName: string, userEmail: string) => {
      // Implement business logic like real service
      const { BadRequestException } = await import('@nestjs/common')
      if (!userName) {
        throw new BadRequestException('User name is required')
      }
      if (!userEmail) {
        throw new BadRequestException('User email is required')
      }
      if (!globalThis.prisma) {
        throw new Error('Prisma not initialized in test context')
      }
      const user = await globalThis.prisma.tbl_user.findUnique({ where: { email: userEmail } })
      if (!user) {
        throw new Error('User not found')
      }
      if (user.emailConfirmed) {
        throw new BadRequestException('Email already confirmed')
      }
      // Skip actual SMTP email sending (would call sendVerificationLink)
      return undefined // void return
    }),

    resendPasswordLink: vi.fn().mockImplementation(async (userEmail: string) => {
      // Implement business logic like real service
      const { BadRequestException } = await import('@nestjs/common')
      if (!userEmail) {
        throw new BadRequestException('User email is required')
      }
      if (!globalThis.prisma) {
        throw new Error('Prisma not initialized in test context')
      }
      const user = await globalThis.prisma.tbl_user.findUnique({ where: { email: userEmail } })
      if (!user) {
        throw new Error('User not found')
      }
      if (!user.passwordResetPending) {
        throw new BadRequestException('No pending password reset request')
      }
      // Skip actual SMTP email sending (would call sendPasswordResetLink)
      return undefined // void return
    }),
  }
}
