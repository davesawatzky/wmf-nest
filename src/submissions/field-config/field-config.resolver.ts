import { UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { tbl_field_config } from '@prisma/client'
import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { FieldConfigInput } from './dto/field-config.input'
import {
  FieldConfig,
  FieldConfigPayload,
} from './entities/field-config.entity'
import { FieldConfigService } from './field-config.service'

@Resolver(() => FieldConfig)
@UseGuards(JwtAuthGuard)
export class FieldConfigResolver {
  constructor(private readonly fieldConfigService: FieldConfigService) {}

  /** Queries */

  @Query(() => [FieldConfig])
  @CheckAbilities({ action: Action.Read, subject: FieldConfig })
  async fieldConfigs() {
    return await this.fieldConfigService.findAll()
  }

  @Query(() => FieldConfig)
  @CheckAbilities({ action: Action.Read, subject: FieldConfig })
  async fieldConfig(
    @Args('tableName', { type: () => String })
    tableName: tbl_field_config['tableName'],
    @Args('fieldName', { type: () => String })
    fieldName: tbl_field_config['fieldName'],
  ) {
    return await this.fieldConfigService.findOne(tableName, fieldName)
  }

  /** Mutations */

  @Mutation(() => FieldConfigPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: FieldConfig })
  async fieldConfigCreate(
    @Args('fieldConfigInput', { type: () => FieldConfigInput })
    fieldConfigInput: FieldConfigInput,
  ) {
    return await this.fieldConfigService.create(fieldConfigInput)
  }

  @Mutation(() => FieldConfigPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: FieldConfig })
  async fieldConfigUpdate(
    @Args('fieldConfigID', { type: () => Int })
    fieldConfigID: FieldConfig['id'],
    @Args('fieldConfigInput', { type: () => FieldConfigInput })
    fieldConfigInput: FieldConfigInput,
  ) {
    return await this.fieldConfigService.update(
      fieldConfigID,
      fieldConfigInput,
    )
  }

  @Mutation(() => FieldConfigPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: FieldConfig })
  async fieldConfigDelete(
    @Args('fieldConfigID', { type: () => Int })
    fieldConfigID: FieldConfig['id'],
  ) {
    return await this.fieldConfigService.remove(fieldConfigID)
  }
}
