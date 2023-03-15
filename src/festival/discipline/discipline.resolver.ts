import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { DisciplineService } from './discipline.service'
import { Discipline, DisciplinePayload } from './entities/discipline.entity'
import { DisciplineInput } from './dto/discipline.input'

@Resolver(() => Discipline)
@UseGuards(JwtAuthGuard)
export class DisciplineResolver {
  constructor(private readonly disciplineService: DisciplineService) {}

  /** Queries */

  @Query(() => [Discipline])
  async disciplines() {
    return this.disciplineService.findAll()
  }

  @Query(() => Discipline)
  async discipline(@Args('id', { type: () => Int }) id: Discipline['id']) {
    return this.disciplineService.findOne(id)
  }

  /** Mutations */

  @Mutation(() => DisciplinePayload)
  async disciplineCreate(
    @Args('disciplineInput') disciplineInput: DisciplineInput,
  ) {
    return this.disciplineService.create(disciplineInput)
  }

  @Mutation(() => DisciplinePayload)
  async disciplineUpdate(
    @Args('id', { type: () => Int }) id: Discipline['id'],
    @Args('disciplineInput') disciplineInput: DisciplineInput,
  ) {
    return this.disciplineService.update(id, disciplineInput)
  }

  @Mutation(() => DisciplinePayload)
  async disciplineDelete(
    @Args('id', { type: () => Int }) id: Discipline['id'],
  ) {
    return this.disciplineService.remove(id)
  }
}
