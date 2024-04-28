import { TestBed } from '@angular/core/testing';
import { MockApiService } from './mock-api.service';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
const testData = {
  name: jasmine.any(String),
  id: jasmine.any(Number),
  age: jasmine.any(Number),
  isActive: jasmine.any(Boolean),
  image: jasmine.any(Boolean),
  superpowers: jasmine.arrayContaining([jasmine.any(String)]),
};

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
});
