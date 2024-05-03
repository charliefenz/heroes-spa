import { TestBed } from '@angular/core/testing';
import { HeroesService } from './heroes.service';
import { MockApiService } from '../../../mock-API/mock-api.service';
import { of, throwError } from 'rxjs';

describe('HeroesService', () => {
  let heroesService: HeroesService;
  let mockApiService: jasmine.SpyObj<MockApiService>;
  const REAL_COMMON_SERVICE_ERROR_MESSAGE_FOR_API_FAIL = (
    method: string
  ): string => `Ha ocurrido un error en el método ${method} de la API`;
  const RANDOM_ERROR_MESSAGE_FOR_MOCKING =
    'Ths is a message of an error that ocurred inside the API';
  const RANDOM_ERROR_FOR_MOCKING = new Error(RANDOM_ERROR_MESSAGE_FOR_MOCKING);
  const API_METHODS_TO_MOCK = [
    'getHeroes',
    'getHero',
    'createHero',
    'editHero',
  ];
  const SOME_RANDOM_ID_ARG = 1;
  const HERO = {
    id: 1,
    name: 'aHero',
    age: 30,
    image: 'someUrl',
    isActive: true,
    superpowers: ['some', 'super', 'power'],
  };
  const MOCK_FAIL_RESPONSE_GET_HERO = {
    code: 440,
    result: `No se ha encontrado el héroe con el id ${SOME_RANDOM_ID_ARG}`,
  };
  const MOCK_FAIL_RESPONSE_CREATE_HERO = {
    code: 500,
    result: `No se ha podido crear el Héroe por un error al intentar asignar una ID única`,
  };
  const MOCK_RESPONSE_OK_GET_HEROES = {
    code: 200,
    result: [HERO]
  }
  const MOCK_RESPONSE_OK_GET_HERO = {
    code: 200,
    result: HERO
  }
  const MOCK_RESPONSE_OK_CREATE_HERO = {
    code: 200,
    result: 'someCode'
  }

  beforeEach(() => {
    const MOCK_API_SPY = jasmine.createSpyObj(
      'MockApiService',
      API_METHODS_TO_MOCK
    );

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

  describe('Error handling', () => {
    beforeEach(() => {
      mockApiService.getHeroes.and.returnValue(
        throwError(() => new Error(RANDOM_ERROR_MESSAGE_FOR_MOCKING))
      );
      mockApiService.getHero.withArgs(SOME_RANDOM_ID_ARG).and.returnValue(
        throwError(() => new Error(RANDOM_ERROR_MESSAGE_FOR_MOCKING))
      );
      mockApiService.createHero.withArgs(HERO).and.returnValue(
        throwError(() => new Error(RANDOM_ERROR_MESSAGE_FOR_MOCKING))
      );
      mockApiService.editHero.withArgs(HERO).and.returnValue(
        throwError(() => new Error(RANDOM_ERROR_MESSAGE_FOR_MOCKING))
      );
    })
    afterEach(() => {
      expect(mockApiService.getHeroes).withContext('getHeroes').toHaveBeenCalled();
      expect(mockApiService.getHero).withContext('getHero').toHaveBeenCalled();
      expect(mockApiService.createHero).withContext('createHero').toHaveBeenCalled();
      expect(mockApiService.editHero).withContext('editHero').toHaveBeenCalled();
    })

    it('should catch and output unexpected errors ocurring in the API mock service', () => {
      spyOn(console, 'error');
      heroesService.getHeroes().subscribe(() => {
        expect(console.error).withContext('getHeroes').toHaveBeenCalledWith(RANDOM_ERROR_FOR_MOCKING);
      });
      heroesService.getHero(SOME_RANDOM_ID_ARG).subscribe(() => {
        expect(console.error).withContext('getHero').toHaveBeenCalledWith(RANDOM_ERROR_FOR_MOCKING);
      });
      heroesService.createHero(HERO).subscribe(() => {
        expect(console.error).withContext('createHero').toHaveBeenCalledWith(RANDOM_ERROR_FOR_MOCKING);
      });
      heroesService.editHero(HERO).subscribe(() => {
        expect(console.error).withContext('editHero').toHaveBeenCalledWith(RANDOM_ERROR_FOR_MOCKING);
      });
    });

    it('should return an observable with the error message assigned to the detection of unexpected errors in the API mock service', () => {
      heroesService.getHeroes().subscribe((errorResponse) => {
        expect(errorResponse.code).withContext('getHeroes Code').toEqual(500);
        expect(errorResponse.result).withContext('getHeroes Result').toEqual(
            REAL_COMMON_SERVICE_ERROR_MESSAGE_FOR_API_FAIL('getHeroes')
          );
      });
      heroesService.getHero(SOME_RANDOM_ID_ARG).subscribe((errorResponse) => {
        expect(errorResponse.code).withContext('getHero Code').toEqual(500);
        expect(errorResponse.result).withContext('getHero Result').toEqual(
            REAL_COMMON_SERVICE_ERROR_MESSAGE_FOR_API_FAIL('getHero')
          );
      });
      heroesService.createHero(HERO).subscribe((errorResponse) => {
        expect(errorResponse.code).withContext('createHero Code').toEqual(500);
        expect(errorResponse.result).withContext('createHero Result').toEqual(
            REAL_COMMON_SERVICE_ERROR_MESSAGE_FOR_API_FAIL('createHero')
          );
      });
      heroesService.editHero(HERO).subscribe((errorResponse) => {
        expect(errorResponse.code).withContext('editHero Code').toEqual(500);
        expect(errorResponse.result).withContext('editHeroe Result').toEqual(
            REAL_COMMON_SERVICE_ERROR_MESSAGE_FOR_API_FAIL('editHero')
          );
      });
    });
  });

  describe('Type Ok Responses', () => {
    beforeEach(() => {
      mockApiService.getHeroes.and.returnValue(of(MOCK_RESPONSE_OK_GET_HEROES));
      mockApiService.getHero
        .withArgs(SOME_RANDOM_ID_ARG)
        .and.returnValue(of(MOCK_RESPONSE_OK_GET_HERO));
      mockApiService.createHero
      .withArgs(HERO)
      .and.returnValue(of(MOCK_RESPONSE_OK_CREATE_HERO));
      mockApiService.editHero
        .withArgs(HERO)
        .and.returnValue(of(MOCK_RESPONSE_OK_GET_HERO));
    })

    it('should return an observable with the expected output for each method', () => {
      heroesService.getHeroes().subscribe((okResponse) => {
        expect(okResponse.code).withContext('getHeroes Code').toEqual(MOCK_RESPONSE_OK_GET_HEROES.code);
        expect(okResponse.result).withContext('getHeroes Result').toEqual(MOCK_RESPONSE_OK_GET_HEROES.result);
      });
      heroesService.getHero(SOME_RANDOM_ID_ARG).subscribe((okResponse) => {
        expect(okResponse.code).withContext('getHero Code').toEqual(MOCK_RESPONSE_OK_GET_HERO.code);
        expect(okResponse.result).withContext('getHero Result').toEqual(MOCK_RESPONSE_OK_GET_HERO.result);
      });
      heroesService
        .createHero(HERO)
        .subscribe((okResponse) => {
          expect(okResponse.code).withContext('createHero Code').toEqual(MOCK_RESPONSE_OK_CREATE_HERO.code);
          expect(okResponse.result).withContext('createHero Result').toEqual(MOCK_RESPONSE_OK_CREATE_HERO.result);
        });
      heroesService.editHero(HERO).subscribe((okResponse) => {
        expect(okResponse.code).withContext('editHero Code').toEqual(MOCK_RESPONSE_OK_GET_HERO.code);
        expect(okResponse.result).withContext('editHero Result').toEqual(MOCK_RESPONSE_OK_GET_HERO.result);
      });
    })
  })

  describe('Type Fail Responses', () => {
    beforeEach(() => {
      mockApiService.getHero.withArgs(SOME_RANDOM_ID_ARG)
        .and.returnValue(of(MOCK_FAIL_RESPONSE_GET_HERO));
      mockApiService.createHero.withArgs(HERO)
      .and.returnValue(of(MOCK_FAIL_RESPONSE_CREATE_HERO));
      mockApiService.editHero
        .withArgs(HERO)
        .and.returnValue(of(MOCK_FAIL_RESPONSE_GET_HERO));
    })

    it('should return an observable with the correct error message for each method when the mock API return handled errors', () => {
      heroesService.getHero(SOME_RANDOM_ID_ARG).subscribe((failResponse) => {
        expect(failResponse.code).withContext('getHero Code').toEqual(MOCK_FAIL_RESPONSE_GET_HERO.code);
        expect(failResponse.result).withContext('getHero Result').toEqual(MOCK_FAIL_RESPONSE_GET_HERO.result);
      });
      heroesService.createHero(HERO).subscribe((failResponse) => {
        expect(failResponse.code).withContext('getHero Code').toEqual(MOCK_FAIL_RESPONSE_CREATE_HERO.code);
        expect(failResponse.result).withContext('getHero Result').toEqual(MOCK_FAIL_RESPONSE_CREATE_HERO.result);
      });
      heroesService.editHero(HERO).subscribe((failResponse) => {
        expect(failResponse.code).withContext('editHero Code').toEqual(MOCK_FAIL_RESPONSE_GET_HERO.code);
        expect(failResponse.result).withContext('editHero Result').toEqual(MOCK_FAIL_RESPONSE_GET_HERO.result);
      });
    })
  })
});
