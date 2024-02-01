import { ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export function mockContext(fakeResponse: object | null): GqlExecutionContext {
  const gqlMockFactory = (context: Record<string, any>): ExecutionContext =>
    ({
      getType: () => 'graphql',
      getHandler: () => 'query',
      getClass: () => 'Test',
      getArgs: () => [{}, {}, context, {}],
      getArgByIndex: () => ({}) as any,
      switchToHttp: () => ({}) as any,
      switchToRpc: () => ({}) as any,
      switchToWs: () => ({}) as any,
    }) as any

  const gqlContextMockFactory = (contextMock: any) =>
    gqlMockFactory(contextMock)

  const res = fakeResponse

  const gqlCtx = gqlContextMockFactory(res)

  return GqlExecutionContext.create(gqlCtx)
}
