import { forwardRef, Module } from '@nestjs/common'
import { AbilityModule } from '@/ability/ability.module.js'
import { OrderModule } from '@/submissions/order/order.module.js'
import { RegistrationModule } from '@/submissions/registration/registration.module.js'
import { UserDataLoader } from './user.dataloader.js'
import { UserResolver } from './user.resolver.js'
import { UserService } from './user.service.js'

@Module({
  providers: [UserResolver, UserService, UserDataLoader],
  imports: [
    forwardRef(() => RegistrationModule),
    AbilityModule,
    forwardRef(() => OrderModule),
  ],
  exports: [UserService],
})
export class UserModule {}
