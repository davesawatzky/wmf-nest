import { Injectable } from '@nestjs/common'
import { SubmissionInput } from './dto/submission.input'
import { randomInt } from 'crypto'
import { SGSlabel } from 'src/common.entity'
import { PrismaService } from 'src/prisma/prisma.service'
import { tbl_registration } from '@prisma/client'

@Injectable()
export class SubmissionService {
  constructor(private prisma: PrismaService) {}

  async submissions(performerType?: SGSlabel) {
    return this.prisma.tbl_registration.findMany({
      where: {
        performerType,
      },
    })
  }

  async submit(id: tbl_registration['id']) {
    const submissionData: SubmissionInput = await {
      submittedAt: new Date(),
      submission: 'WMF-' + id + '-' + randomInt(1000, 9999),
    }
    return this.prisma.tbl_registration.update({
      where: { id },
      data: { ...submissionData },
    })
  }
}
