import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
  // 'local' is the name of the strategy being used
  constructor() {
    super()
  }

  getRequest(context: ExecutionContext) {
    // console.error(context)
    const ctx = GqlExecutionContext.create(context)

    // console.error(ctx)

    const request = ctx.getContext()

    // console.error(request)

    request.body = ctx.getArgs().credentials

    // console.error(ctx.getContext().body)

    return request
  }
}
