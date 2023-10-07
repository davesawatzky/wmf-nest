import { Test } from '@nestjs/testing'
import { AppModule } from '../app.module'
import { AuthService } from '../auth/auth.service'
import { testUser } from '../user/test/stubs/user.stub'

export default async (): Promise<void> => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  const app = moduleRef.createNestApplication()
  await app.init()

  const authService = moduleRef.get<AuthService>(AuthService)
  await authService.signup(testUser)
  console.log('Test user signed up')

  await app.close()
}
