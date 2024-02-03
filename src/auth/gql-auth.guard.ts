import { Injectable, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
  // 'local' is the name of the strategy being used
  constructor() {
    super()
  }

  getRequest(context: ExecutionContext) {
    // console.log(context)
    const ctx = GqlExecutionContext.create(context)

    // console.log(ctx)

    const request = ctx.getContext()

    // console.log(request)

    request.body = ctx.getArgs().credentials

    // console.log(ctx.getContext().body)

    return request
  }
}
