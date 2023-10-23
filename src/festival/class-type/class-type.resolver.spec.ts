import { Test, TestingModule } from '@nestjs/testing';
import { ClassTypeResolver } from './class-type.resolver';

describe('ClassTypeResolver', () => {
  let resolver: ClassTypeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassTypeResolver],
    }).compile();

    resolver = module.get<ClassTypeResolver>(ClassTypeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
