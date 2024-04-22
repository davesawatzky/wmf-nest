import { ForbiddenError } from '@casl/ability'
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AbilityFactory } from './ability.factory'
import { RequiredRule, CHECK_ABILITY } from './abilities.decorator'
import {GqlExecutionContext} from '@nestjs/graphql'

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: AbilityFactory
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      []
    const ctx = GqlExecutionContext.create(context)
    const user = ctx.getContext().req.user
    // console.log(user)
    const ability = this.caslAbilityFactory.defineAbility(user)

    try {
      rules.forEach((rule) => {
        return ForbiddenError.from(ability).throwUnlessCan(
          rule.action,
          rule.subject
        )
      })
      return true
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message)
      }
    }
  }
}
