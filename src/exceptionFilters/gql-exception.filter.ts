import { ArgumentsHost } from '@nestjs/common'
import { Catch, HttpException } from '@nestjs/common'
import { GqlExceptionFilter } from '@nestjs/graphql'
import { GqlArgumentsHost } from '@nestjs/graphql'

@Catch(HttpException)
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host)
    console.log('GQLHost: ', gqlHost)
    console.log('GQLException: ', exception)
    return exception
  }
}
