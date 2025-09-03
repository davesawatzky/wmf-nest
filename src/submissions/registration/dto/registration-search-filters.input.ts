import { InputType } from '@nestjs/graphql'
import { SearchFilterInputFactory } from '@/common/search-filters'
import { Registration } from '../entities/registration.entity'

// Create a Registration-specific search filter input type
// This gives us proper typing for all registration fields
const RegistrationSearchFiltersBase = SearchFilterInputFactory.create<Registration>(
  'Registration',
  [
    'id',
    'userID',
    'label',
    'performerType',
    'teacherID',
    'photoPermission',
    'payedAmt',
    'totalAmt',
    'confirmation',
    'transactionInfo',
    'createdAt',
    'updatedAt',
    'submittedAt',
  ],
)

@InputType()
export class RegistrationSearchFilters extends RegistrationSearchFiltersBase {}
