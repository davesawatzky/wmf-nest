import { Test, TestingModule } from '@nestjs/testing';
import { FieldConfigService } from './field-config.service';

describe('FieldConfigService', () => {
  let service: FieldConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FieldConfigService],
    }).compile();

    service = module.get<FieldConfigService>(FieldConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});