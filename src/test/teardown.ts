import { Test } from '@nestjs/testing'
import { AppModule } from '../app.module'
import { UserService } from '../user/user.service'
import { testUser } from '../user/test/stubs/user.stub'

export default async (): Promise<void> => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  const app = moduleRef.createNestApplication()
  await app.init()

  const userService = moduleRef.get<UserService>(UserService)
  const user = await userService.findOne(null, testUser.email)
  await userService.remove(user.id)

  await app.close()
}
