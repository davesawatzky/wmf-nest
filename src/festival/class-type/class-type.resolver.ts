import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { tbl_class_type } from '@prisma/client'
import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { FestivalClass } from '@/festival/festival-class/entities/festival-class.entity'
import { FestivalClassService } from '@/festival/festival-class/festival-class.service'
import { ClassTypeService } from './class-type.service'
import { ClassTypeInput } from './dto/class-type.input'
import { ClassType, ClassTypePayload } from './entities/class-type.entity'

@Resolver(() => ClassType)
@UseGuards(JwtAuthGuard)
export class ClassTypeResolver {
  constructor(
    private readonly classTypeService: ClassTypeService,
    private readonly festivalClassService: FestivalClassService,
  ) {}

  /** Queries */

  @Query(() => [ClassType])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: ClassType })
  async classTypes() {
    return await this.classTypeService.findAll()
  }

  @Query(() => ClassType)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: ClassType })
  async classType(@Args('id', { type: () => Int }) id: ClassType['id']) {
    return await this.classTypeService.findOne(id)
  }

  /** Mutations */

  @Mutation(() => ClassTypePayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: ClassType })
  async classTypeCreate(@Args('classTypeInput') classTypeInput: ClassTypeInput) {
    let response: any
    try {
      response = await this.classTypeService.create(classTypeInput)
    }
    catch (error) {
      throw new HttpException('Could not create class type', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return response
  }

  @Mutation(() => ClassTypePayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: ClassType })
  async classTypeUpdate(
    @Args('classTypeID', { type: () => Int }) classTypeID: ClassType['id'],
    @Args('classTypeInput') classTypeInput: ClassTypeInput,
  ) {
    let response: any
    try {
      response = await this.classTypeService.update(classTypeID, classTypeInput)
    }
    catch (error) {
      throw new HttpException('Class type to update not found', HttpStatus.BAD_REQUEST)
    }
    return response
  }

  @Mutation(() => ClassTypePayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: ClassType })
  async classTypeDelete(
    @Args('classTypeID', { type: () => Int }) classTypeID: ClassType['id'],
  ) {
    let response: any
    try {
      response = await this.classTypeService.remove(classTypeID)
    }
    catch (error) {
      throw new HttpException('Class type to delete not found', HttpStatus.BAD_REQUEST)
    }
    return response
  }

  /** Field Resolvers */
  @ResolveField(() => [FestivalClass])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: FestivalClass })
  async festivalClasses(
    @Parent() classType: tbl_class_type,
  ) {
    const classTypeID = classType.id
    return await this.festivalClassService.findAll(undefined, undefined, undefined, undefined, classTypeID)
  }
}
