import request from 'supertest'

export function getGqlErrorStatus(response: request.Response): number {
  return response.body.errors[0].extentions.code
}
