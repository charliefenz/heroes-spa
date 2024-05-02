import { TestBed } from '@angular/core/testing';
import { HeroesService } from './heroes.service';
import { MockApiService } from '../../../mock-API/mock-api.service';
import { of, throwError } from 'rxjs';
import { Hero } from '../../../models/hero';

describe('HeroesService', () => {
  let heroesService: HeroesService;
  let mockApiService: jasmine.SpyObj<MockApiService>;
  const COMMON_API_ERROR_MESSAGE = (method: string) : string => `Ha ocurrido un error en el método ${method} de la API`;

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

    it('should detect and output the errors ocurring in the API mock service', () => {
      let error = new Error(ERROR_MESSAGE);
      mockApiService.getHeroes.and.returnValue(throwError(() => new Error(ERROR_MESSAGE))); // Has to be providing callback to avoid deprecation
      spyOn(console, 'error');
      heroesService.getHeroes().subscribe({
        next: (errorResponse) => {
          expect(console.error).toHaveBeenCalledWith(error)
        },
      })
      expect(mockApiService.getHeroes).toHaveBeenCalled();
    });

    it('should send the appropiate error message when detecting any error ocurring in the mock service', () => {
      mockApiService.getHeroes.and.returnValue(throwError(() => new Error(ERROR_MESSAGE))); // Has to be providing callback to avoid deprecation
      heroesService.getHeroes().subscribe({
        next: (errorResponse) => {
          expect(errorResponse.code).toEqual(500);
          expect(errorResponse.result).toEqual(COMMON_API_ERROR_MESSAGE('getHeroes'));
        },
      })
      expect(mockApiService.getHeroes).toHaveBeenCalled();
    });
  });
});
