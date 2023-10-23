import { Resolver, Query, Args, Int } from '@nestjs/graphql'
import { ClassType } from './entities/class-type.entity'
import { ClassTypeService } from './class-type.service'

@Resolver(() => ClassType)
export class ClassTypeResolver {
  constructor(private readonly classTypeService: ClassTypeService) {}

  /** Queries */

  @Query(() => ClassType)
  async classType(@Args('id', { type: () => Int }) id: ClassType['id']) {
    return await this.classTypeService.findOne(id)
  }
}
