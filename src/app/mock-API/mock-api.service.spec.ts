import { TestBed } from '@angular/core/testing';
import { MockApiService } from './mock-api.service';
import { concatMap, map } from 'rxjs';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
const testData = {
  name: jasmine.any(String),
  id: jasmine.any(Number),
  age: jasmine.any(Number),
  isActive: jasmine.any(Boolean),
  image: jasmine.any(String),
  superpowers: jasmine.arrayContaining([jasmine.any(String)]),
};
const TEST_ID_OK = 1; // There's always at least one hero
const TEST_ID_NOT_OK = 0; // Not one hero will have an ID = 0

describe('MockApiService', () => {
  let service: MockApiService;

  beforeAll(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockApiService);
  });

  describe('service', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('getHeroes', () => {
    it('should return the heroes with the Hero Interface', (done: DoneFn) => {
      let heroes$;

      heroes$ = service.getHeroes();
      heroes$.subscribe((response) => {
        expect(response.code).withContext('Status Code').toEqual(200);
        expect(response.result).withContext('Response does not have the expected interface').toEqual(
          jasmine.arrayContaining([jasmine.objectContaining(testData)])
        );
        done();
      });      
    });
  });

  describe('getHero', () => {
    it('should return the hero with the Hero Interface when ID exists', (done: DoneFn) => {
      let hero$;

      hero$ = service.getHero(TEST_ID_OK);
      hero$.subscribe((response) => {
        expect(response.code).withContext('Status Code').toEqual(200);
        expect(response.result).withContext('Response does not have the expected interface').toEqual(
          jasmine.objectContaining(testData)
        );
        done();
      });      
    });

    it('should return an error message when ID doesn\'t exist', (done: DoneFn) => {
      let hero$;

      hero$ = service.getHero(TEST_ID_NOT_OK);
      hero$.subscribe((response) => {
        expect(response.code).withContext('Status Code').toEqual(440);
        expect(response.result).withContext('Response does not have the expected interface').toEqual(jasmine.any(String));
        done();
      });      
    });
  });

  describe('deleteHero', () => {
    it('should delete the hero corresponding to the id provided and return the right message', (done: DoneFn) => {
      service.deleteHero(TEST_ID_OK).pipe(
        map(deleteHeroResponse => {
          expect(deleteHeroResponse.code).withContext('Status Code').toEqual(200);
          expect(deleteHeroResponse.result).withContext('Delete message').toContain('eliminado')
          expect(deleteHeroResponse.result).withContext('ID in delete message').toContain(TEST_ID_OK)  
        }),
        concatMap(() => service.getHeroes())
      ).subscribe(getHeroesResponse => {
        if (Array.isArray(getHeroesResponse.result)) {
          expect(getHeroesResponse.result.find((item) => item.id === TEST_ID_OK)).withContext('ID corresponding to the item to delete is still present in item collection').toBeUndefined();
        }
        done();
      })
    });

    it('should return the right error message when ID doesn\'t exist', (done: DoneFn) => {
      service.deleteHero(TEST_ID_NOT_OK).subscribe((response) => {
        expect(response.code).withContext('Status Code').toEqual(440);
        expect(response.result).withContext('Error message').toContain('No se ha encontrado');
        expect(response.result).withContext('ID in Error message').toContain(TEST_ID_NOT_OK);
        done();
      });  
    });
  })
});
