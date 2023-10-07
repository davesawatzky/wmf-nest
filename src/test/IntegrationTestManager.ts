import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import cookieParser from 'cookie-parser'
import { AppModule } from '../app.module'
import { AuthService } from '../auth/auth.service'
import { PrismaService } from '../prisma/prisma.service'
import { UserService } from '../user/user.service'
import { testUser } from '../user/test/stubs/user.stub'

export class IntegrationTestManager {
  public httpServer: any

  private app: INestApplication
  private accessToken: string

  async beforeAll(): Promise<void> {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    this.app = moduleRef.createNestApplication()
    this.app.use(cookieParser())
    await this.app.init()
    this.httpServer = this.app.getHttpServer()
    const authService = this.app.get<AuthService>(AuthService)
    const userService = this.app.get<UserService>(UserService)
    const userId = (await userService.findOne(null, testUser.email)).id
    this.accessToken = (
      await authService.signin({ email: testUser.email, id: userId })
    ).diatonicToken
  }

  async afterAll() {
    await this.app.close()
  }

  getAccessToken(): string {
    return this.accessToken
  }
}
