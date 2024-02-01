import { userSignup } from '../stubs/signup'
import type { Mock } from 'vitest'

const { password, ...userDetails } = userSignup()

export const AuthService = () => vi.fn().{
  signup: vi.fn().mockResolvedValue({
    userErrors: [],
    diatonic: '',
    user: {
      ...userSignup(),
    },
  }),
  signin: vi.fn().mockResolvedValue({
    userErrors: [],
    diatonicToken: 'jwtToken',
    user: {
      ...userSignup(),
    },
  }),
  findOne: vi.fn().mockResolvedValue({
    user: {
      ...userSignup(),
    },
  }),
  checkIfPasswordExists: vi.fn().mockResolvedValue({
    id: 1,
    pass: userSignup().password,
  }),
  validateUser: vi.fn().mockResolvedValue({
    result: userDetails,
  }),
  findAuthenticatedUser: vi.fn().mockResolvedValue({
    result: userDetails,
  }),
}
