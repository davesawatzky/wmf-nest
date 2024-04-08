import { Resolver, Query, Args, Int, Mutation, ResolveField, Parent } from '@nestjs/graphql'
import { ClassType, ClassTypePayload } from './entities/class-type.entity'
import { ClassTypeService } from './class-type.service'
import {HttpException, HttpStatus, UseGuards} from '@nestjs/common'
import {JwtAuthGuard} from '@/auth/jwt-auth.guard'
import {ClassTypeInput} from './dto/class-type.input'
import {tbl_class_type} from '@prisma/client'
import {FestivalClass} from '@/festival/festival-class/entities/festival-class.entity'
import { FestivalClassService } from '@/festival/festival-class/festival-class.service'

@Resolver(() => ClassType)
@UseGuards(JwtAuthGuard)
export class ClassTypeResolver {
  constructor(
    private readonly classTypeService: ClassTypeService,
    private readonly festivalClassService: FestivalClassService) {}

  /** Queries */

  @Query(() => [ClassType])
  async classTypes() {
    return await this.classTypeService.findAll()
  }

  @Query(() => ClassType)
  async classType(@Args('id', { type: () => Int }) id: ClassType['id']) {
    return await this.classTypeService.findOne(id)
  }

  /** Mutations */

  @Mutation(() => ClassTypePayload)
  async classTypeCreate(@Args('classTypeInput') classTypeInput: ClassTypeInput) {
    let response: any
    try {
      response = await this.classTypeService.create(classTypeInput)
    } catch (error) {
      throw new HttpException('Could not create class type', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return response
  }

  @Mutation(() => ClassTypePayload)
  async classTypeUpdate(
    @Args('classTypeID', {type: () => Int}) classTypeID: ClassType['id'],
    @Args('classTypeInput') classTypeInput:ClassTypeInput
  ) {
    let response: any
    try {
      response = await this.classTypeService.update(classTypeID, classTypeInput)
    } catch (error) {
      throw new HttpException('Class type to update not found', HttpStatus.BAD_REQUEST)
    }
    return response
  }

  @Mutation(() => ClassTypePayload)
  async classTypeDelete(
    @Args('classTypeID', {type: () => Int}) classTypeID: ClassType['id']
  ) {
    let response: any
    try {
      response = await this.classTypeService.remove(classTypeID)
    } catch (error) {
      throw new HttpException('Class type to delete not found', HttpStatus.BAD_REQUEST)
    }
    return response
  }

  /** Field Resolvers */
  @ResolveField(() => [FestivalClass])
  async festivalClasses(
    @Parent() classType: tbl_class_type,
  ) {
    const classTypeID = classType.id
    return await this.festivalClassService.findAll(undefined, undefined, undefined, undefined, classTypeID)
  }
}
