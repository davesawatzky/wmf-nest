import { Request } from 'express'
import { User } from '@/user/entities/user.entity.js'

interface RequestWithUser extends Request {
  user: User
}

export default RequestWithUser
