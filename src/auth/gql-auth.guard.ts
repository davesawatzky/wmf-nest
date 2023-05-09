import { Injectable, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { log } from 'console'

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
  // 'local' is the name of the strategy being used
  constructor() {
    super()
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext()
    request.body = ctx.getArgs().credentials
    return request
  }
}
