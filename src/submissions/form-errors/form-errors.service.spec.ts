import { Test, TestingModule } from '@nestjs/testing';
import { FormErrorsService } from './form-errors.service';

describe('FormErrorsService', () => {
  let service: FormErrorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormErrorsService],
    }).compile();

    service = module.get<FormErrorsService>(FormErrorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
