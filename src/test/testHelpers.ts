import request from 'supertest-graphql'

export type UserRole = 'admin' | 'user' | 'privateTeacher' | 'schoolTeacher'

export function getAuthToken(role: UserRole): string {
  const context = globalThis.testContext

  switch (role) {
    case 'admin': return context.admin.token
    case 'user': return context.user.token
    case 'privateTeacher': return context.privateTeacher?.token || context.user.token
    case 'schoolTeacher': return context.schoolTeacher?.token || context.user.token
    default: throw new Error(`Unknown role: ${role}`)
  }
}

export function getUserId(role: UserRole): number {
  const context = globalThis.testContext

  switch (role) {
    case 'admin': return context.admin.userId
    case 'user': return context.user.userId
    case 'privateTeacher': return context.privateTeacher?.userId || context.user.userId
    case 'schoolTeacher': return context.schoolTeacher?.userId || context.user.userId
    default: throw new Error(`Unknown role: ${role}`)
  }
}

export function createAuthenticatedRequest<T>(role: UserRole) {
  const token = getAuthToken(role)

  return request<T>(globalThis.httpServer)
    .set('Cookie', `diatonicToken=${token}`)
}

export async function testWithBothRoles<T>(
  testName: string,
  testFn: (role: UserRole, token: string, userId: number) => Promise<T>,
): Promise<{ admin: T, user: T }> {
  const results = {
    admin: await testFn('admin', getAuthToken('admin'), getUserId('admin')),
    user: await testFn('user', getAuthToken('user'), getUserId('user')),
  }

  return results
}

export async function expectAuthorized<T>(
  role: UserRole,
  operation: () => Promise<T | any>,
): Promise<any> {
  const result = await operation()
  expect(result.errors).toBeUndefined()
  return result
}

export async function expectUnauthorized(
  role: UserRole,
  operation: () => Promise<any>,
): Promise<void> {
  const result = await operation()
  expect(result.errors).toBeDefined()
}

// Helper to run the same test with different roles
export function testAsRoles(
  roles: UserRole[],
  testFn: (role: UserRole) => void | Promise<void>,
) {
  for (const role of roles) {
    testFn(role)
  }
}
