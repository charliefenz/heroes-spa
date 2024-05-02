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
    const MOCK_API_SPY = jasmine.createSpyObj('MockApiService', ['getHeroes', 'getHero']);

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
      mockApiService.getHeroes.and.returnValue(throwError(() => new Error(ERROR_MESSAGE))); // Arg has to be providing callback to avoid deprecation
      spyOn(console, 'error');
      heroesService.getHeroes().subscribe({
        next: () => {
          expect(console.error).toHaveBeenCalledWith(error)
        },
      })
      expect(mockApiService.getHeroes).toHaveBeenCalled();
    });

    it('should send the appropiate error message when detecting any error ocurring in the mock service', () => {
      mockApiService.getHeroes.and.returnValue(throwError(() => new Error(ERROR_MESSAGE))); // Arg has to be providing callback to avoid deprecation
      heroesService.getHeroes().subscribe({
        next: (errorResponse) => {
          expect(errorResponse.code).toEqual(500);
          expect(errorResponse.result).toEqual(COMMON_API_ERROR_MESSAGE('getHeroes'));
        },
      })
      expect(mockApiService.getHeroes).toHaveBeenCalled();
    });
  });

  describe('getHero', () => {
    const PARAM_OK = 1;
    const PARAM_NOT_OK = -1;
    const MOCK_RESPONSE_OK = {
      code: 200,
      result: {
        id: PARAM_OK,
        name: 'heroTest',
        age: 30,
        image: 'someUrl',
        isActive: true,
        superpowers: ['some', 'super', 'power'],
      },
    };
    const MOCK_RESPONSE_NOT_OK = {
      code: 440,
      result: `No se ha encontrado el héroe con el id ${PARAM_NOT_OK}`
    };
    const ERROR_MESSAGE = 'Error fetching hero';

    it('should expose the observable containing the hero correspondant to the id sent through as argument', () => {
      mockApiService.getHero.withArgs(PARAM_OK).and.returnValue(of(MOCK_RESPONSE_OK));
      heroesService.getHero(PARAM_OK).subscribe((heroesResponse) => {
        let hero = heroesResponse.result as Hero;
        expect(heroesResponse.code).toEqual(200);
        expect(hero).toEqual(MOCK_RESPONSE_OK.result);
      });
    });

    it('should expose the observable containing the code error and message when hero is not found', () => {
      mockApiService.getHero.withArgs(PARAM_NOT_OK).and.returnValue(of(MOCK_RESPONSE_NOT_OK));
      heroesService.getHero(PARAM_NOT_OK).subscribe((heroesResponse) => {
        let errorMessage = heroesResponse.result as string;
        expect(heroesResponse.code).toEqual(440);
        expect(errorMessage).toEqual(MOCK_RESPONSE_NOT_OK.result);
      });
    });

    it('should detect and output the errors ocurring in the API mock service', () => {
      let error = new Error(ERROR_MESSAGE);
      mockApiService.getHero.withArgs(PARAM_OK).and.returnValue(
        throwError(() => new Error(ERROR_MESSAGE))
      ); // Arg has to be providing callback to avoid deprecation
      spyOn(console, 'error');
      heroesService.getHero(PARAM_OK).subscribe({
        next: () => {
          expect(console.error).toHaveBeenCalledWith(error)
        },
      })
      expect(mockApiService.getHero).toHaveBeenCalled();
    });

    it('should send the appropiate error message when detecting any error ocurring in the mock service', () => {
      mockApiService.getHero.withArgs(PARAM_OK).and.returnValue(
        throwError(() => new Error(ERROR_MESSAGE))
      ); // Arg has to be providing callback to avoid deprecation
      heroesService.getHero(PARAM_OK).subscribe({
        next: (errorResponse) => {
          expect(errorResponse.code).toEqual(500);
          expect(errorResponse.result).toEqual(COMMON_API_ERROR_MESSAGE('getHero'));
        },
      })
      expect(mockApiService.getHero).toHaveBeenCalled();
    });
  });
});
