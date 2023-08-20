import { Test, TestingModule } from '@nestjs/testing';
import { FormErrorsResolver } from './form-errors.resolver';
import { FormErrorsService } from './form-errors.service';

describe('FormErrorsResolver', () => {
  let resolver: FormErrorsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormErrorsResolver, FormErrorsService],
    }).compile();

    resolver = module.get<FormErrorsResolver>(FormErrorsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
