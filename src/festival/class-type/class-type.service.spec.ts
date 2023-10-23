import { Test, TestingModule } from '@nestjs/testing';
import { ClassTypeService } from './class-type.service';

describe('ClassTypeService', () => {
  let service: ClassTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassTypeService],
    }).compile();

    service = module.get<ClassTypeService>(ClassTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
