import { Test } from '@nestjs/testing'
import { AppModule } from '../app.module'
import { UserService } from '../user/user.service'
import { userSignup } from '../auth/stubs/signup'
import { PrismaService } from '../prisma/prisma.service'

export default async (): Promise<void> => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  const app = moduleRef.createNestApplication()
  await app.init()

  const prisma = moduleRef.get<PrismaService>(PrismaService)
  await prisma.tbl_user.delete({
    where: {
      email: userSignup()[0].email,
    },
  })
  await app.close()
}
