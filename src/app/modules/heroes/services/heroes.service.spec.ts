import { TestBed } from '@angular/core/testing';
import { HeroesService } from './heroes.service';

describe('HeroesService', () => {
  let heroesService: HeroesService;
  let mockApiService: jasmine.SpyObj<MockApiService>;

  beforeEach(() => {
    const MOCK_API_SPY = jasmine.createSpyObj('MockApiService', ['getHeroes']);

    TestBed.configureTestingModule({
      providers: [
        HeroesService,
        { provide: MockApiService, useValue: MOCK_API_SPY },
      ],
    });
    heroesService = TestBed.inject(HeroesService);
    mockApiService = TestBed.inject(
      MockApiService
    ) as jasmine.SpyObj<MockApiService>;
  });

  it('should be created', () => {
    expect(heroesService).toBeTruthy();
  });
  });
});
