import { ArgumentMetadata, PipeTransform } from '@nestjs/common'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SubmissionPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value
  }
}
