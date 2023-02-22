import { ObjectType } from '@nestjs/graphql'
import { UserError } from 'src/common.entity'

@ObjectType()
export class AuthPayload {
  userErrors: UserError[]
  access_token?: string
}
