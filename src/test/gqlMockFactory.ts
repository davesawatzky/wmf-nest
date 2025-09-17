import { ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export function mockContext(
  fakeExecutionContext: object | null,
): GqlExecutionContext {
  const gqlMockFactory = (context: Record<string, any>): ExecutionContext =>
    ({
      getType: () => 'graphql',
      getHandler: () => 'query',
      getClass: () => 'Test',
      getContext: () => ({
        res: {
          cookie: vi.fn(),
        },
        body: context,
      }),
      getArgs: () => [
        {},
        {
          credentials: {
            email: context.email,
            password: context.password,
          },
        },
        {
          res: {
            cookie: vi.fn(),
          },
          body: context,
        },
        {},
      ],
      getArgByIndex: () => ({}) as any,
      switchToHttp: () => ({}) as any,
      switchToRpc: () => ({}) as any,
      switchToWs: () => ({}) as any,
    }) as any

  const res = fakeExecutionContext ?? { key: 'value' }

  const gqlCtx = gqlMockFactory(res)

  const newContext = GqlExecutionContext.create(gqlCtx)
  // console.log(GqlExecutionContext.create(gqlCtx))

  return newContext
}
