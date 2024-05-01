import { TestBed } from '@angular/core/testing';
import { HeroesService } from './heroes.service';
import { MockApiService } from '../../../mock-API/mock-api.service';
import { of, throwError } from 'rxjs';
import { Hero } from '../../../models/hero';

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

  describe('getHeroes', () => {
    const MOCK_RESPONSE_OK = {
      code: 200,
      result: [
        {
          id: 1,
          name: 'heroTest',
          age: 30,
          image: 'someUrl',
          isActive: true,
          superpowers: ['some', 'super', 'power'],
        },
        {
          id: 2,
          name: 'heroTest2',
          age: 30,
          image: 'someUrl',
          isActive: true,
          superpowers: ['some', 'super', 'power'],
        },
      ],
    };
    const ERROR_MESSAGE = 'Error fetching heroes';

    it('should expose the observable containing heroes from the mock API', () => {
      mockApiService.getHeroes.and.returnValue(of(MOCK_RESPONSE_OK));
      heroesService.getHeroes().subscribe((heroesResponse) => {
        let heroes = heroesResponse.result as Hero[];
        expect(heroesResponse.code).toEqual(200);
        expect(heroes).toEqual(MOCK_RESPONSE_OK.result);
      });
    });

    it('should propagate the error when the API mock service fails unexpectedly', () => {
      mockApiService.getHeroes.and.returnValue(throwError(() => new Error(ERROR_MESSAGE)));
      spyOn(console, 'error');
      heroesService.getHeroes().subscribe({
        next: () => {
          fail('Expected error but got a value')
        },
        error: (error) => {
          expect(console.error).toHaveBeenCalledWith('Error fetching data for getting heroes list', error)
        }
      })
      expect(mockApiService.getHeroes).toHaveBeenCalled();
    });
  });
});
