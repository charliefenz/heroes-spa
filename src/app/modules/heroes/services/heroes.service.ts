import { Injectable } from '@angular/core';
import { MockApiService } from '../../../mock-API/mock-api.service';
import { Response } from '../../../models/response';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private mockApiErrorResult = (method: string) : string => `Ha ocurrido un error en el método ${method} de la API`;
  private mockApiErrorCode = 500;
  private mockApiErrorResponse = {
    code: this.mockApiErrorCode,
    result: ''
  }
    
  constructor(private mockAPI: MockApiService) { 
  }

  getHeroes(): Observable<Response> {  
    return this.mockAPI.getHeroes().pipe(
      catchError(error => {
        console.error(error);
        this.mockApiErrorResponse.result = this.mockApiErrorResult('getHeroes');
        return of(this.mockApiErrorResponse);
      })
    )
  }

  getHero(paramId: number): Observable<Response> {
    // with pipe the observable is resent to any item injecting this service
    // just like httpClient would do
    return this.mockAPI.getHero(paramId).pipe(
      catchError(error => {
        console.error('Error fetching data for getting a hero', error);
        throw error;
      })
    )
  }
}
