import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { SchoolService } from './school.service'
import { CreateSchoolInput } from './dto/create-school.input'
import { UpdateSchoolInput } from './dto/update-school.input'

@Resolver('School')
export class SchoolResolver {
  constructor(private readonly schoolService: SchoolService) {}

  @Mutation('createSchool')
  create(@Args('createSchoolInput') createSchoolInput: CreateSchoolInput) {
    return this.schoolService.create(createSchoolInput)
  }

  @Query('school')
  findAll() {
    return this.schoolService.findAll()
  }

  @Query('school')
  findOne(@Args('id') id: number) {
    return this.schoolService.findOne(id)
  }

  @Mutation('updateSchool')
  update(@Args('updateSchoolInput') updateSchoolInput: UpdateSchoolInput) {
    return this.schoolService.update(updateSchoolInput.id, updateSchoolInput)
  }

  @Mutation('removeSchool')
  remove(@Args('id') id: number) {
    return this.schoolService.remove(id)
  }
}
