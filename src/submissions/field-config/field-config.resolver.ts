import { Args, Query, Resolver } from '@nestjs/graphql'
import { tbl_field_config } from '@prisma/client'
import { FieldConfig } from './entities/field-config.entity'
import { FieldConfigService } from './field-config.service'

@Resolver(() => FieldConfig)
export class FieldConfigResolver {
  constructor(private readonly fieldConfigService: FieldConfigService) {}

  // @Mutation(() => FieldConfig)
  // createFieldConfig(
  //   @Args('FieldConfigInput')
  //   FieldConfigInput: FieldConfigInput
  // ) {
  //   return this.fieldConfigService.create(FieldConfigInput)
  // }

  @Query(() => [FieldConfig])
  async fieldConfigs() {
    return await this.fieldConfigService.findAll()
  }

  @Query(() => FieldConfig)
  async fieldConfig(
    @Args('tableName', { type: () => String })
    tableName: tbl_field_config['tableName'],
    @Args('fieldName', { type: () => String })
    fieldName: tbl_field_config['fieldName'],
  ) {
    return this.fieldConfigService.findOne(tableName, fieldName)
  }

  // @Mutation(() => FieldConfig)
  // updateFieldConfig(
  //   @Args('FieldConfigInput')
  //   FieldConfigInput: FieldConfigInput
  // ) {
  //   return this.fieldConfigService.update(FieldConfigInput.id, FieldConfigInput)
  // }

  // @Mutation(() => FieldConfig)
  // removeFieldConfig(@Args('id', { type: () => Int }) id: number) {
  //   return this.fieldConfigService.remove(id)
  // }
}
