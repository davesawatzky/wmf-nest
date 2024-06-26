import { InputType } from '@nestjs/graphql'

@InputType()
export class CategoryInput {
  name: string
  description?: string
  requiredComposer?: string
}
