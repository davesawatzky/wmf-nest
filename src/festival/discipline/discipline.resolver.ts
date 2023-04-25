import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { DisciplineService } from './discipline.service'
import { Discipline, DisciplinePayload } from './entities/discipline.entity'
import { SubdisciplineService } from '../subdiscipline/subdiscipline.service'
import { DisciplineInput } from './dto/discipline.input'
import { SGSLabel } from 'src/common.entity'

@Resolver(() => Discipline)
@UseGuards(JwtAuthGuard)
export class DisciplineResolver {
  constructor(
    private readonly disciplineService: DisciplineService,
    private readonly subdisciplineService: SubdisciplineService
  ) {}

  /** Queries */

  @Query(() => [Discipline])
  async disciplines(
    @Args('SGSLabel', { type: () => SGSLabel, nullable: true })
    SGSLabel: SGSLabel
  ) {
    return this.disciplineService.findAll(SGSLabel)
  }

  @Query(() => Discipline)
  async discipline(@Args('id', { type: () => Int }) id: Discipline['id']) {
    return this.disciplineService.findOne(id)
  }

  /** Mutations */

  @Mutation(() => DisciplinePayload)
  async disciplineCreate(@Args('disciplineInput') disciplineInput: DisciplineInput) {
    return this.disciplineService.create(disciplineInput)
  }

  @Mutation(() => DisciplinePayload)
  async disciplineUpdate(
    @Args('id', { type: () => Int }) id: Discipline['id'],
    @Args('disciplineInput') disciplineInput: DisciplineInput
  ) {
    return this.disciplineService.update(id, disciplineInput)
  }

  @Mutation(() => DisciplinePayload)
  async disciplineDelete(@Args('id', { type: () => Int }) id: Discipline['id']) {
    return this.disciplineService.remove(id)
  }

  @ResolveField()
  async subdisciplines(
    @Parent() discipline: Discipline,
    @Args('SGSLabel', { type: () => SGSLabel, nullable: true })
    SGSLabel: SGSLabel
  ) {
    const { id } = discipline
    return this.subdisciplineService.findAll(id, undefined, undefined, SGSLabel)
  }
}
