import { userSignup } from '../stubs/signup'

const { password, ...userDetails } = userSignup()[0]

export const AuthService = vi.fn().mockReturnValue({
  signup: vi.fn().mockResolvedValue({
    userErrors: [],
    diatonic: '',
    user: {
      ...userSignup()[0],
    },
  }),
  signin: vi.fn().mockResolvedValue({
    userErrors: [],
    diatonicToken: null,
    user: {
      ...userSignup()[0],
    },
  }),
  findOne: vi.fn().mockResolvedValue({
    user: {
      ...userSignup()[0],
    },
  }),
  checkIfPasswordExists: vi.fn().mockResolvedValue({
    id: 1,
    pass: userSignup()[0].password,
  }),
  validateUser: vi.fn().mockResolvedValue({
    result: userDetails,
  }),
  findAuthenticatedUser: vi.fn().mockResolvedValue({
    result: userDetails,
  }),
})
