import { Injectable } from '@angular/core';
import { MockApiService } from '../../../mock-API/mock-api.service';
import { Response } from '../../../models/response';
import { Observable, catchError, of } from 'rxjs';
import { Hero } from '../../../models/hero';

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
    return this.mockAPI.getHero(paramId).pipe(
      catchError(error => {
        console.error(error);
        this.mockApiErrorResponse.result = this.mockApiErrorResult('getHero');
        return of(this.mockApiErrorResponse);
      })
    )
  }

  createHero(hero: Hero): Observable<Response> {
    return this.mockAPI.createHero(hero).pipe(
      catchError(error => {
        console.error(error);
        this.mockApiErrorResponse.result = this.mockApiErrorResult('createHero');
        return of(this.mockApiErrorResponse);
      })
    )
  }

  editHero(hero: Hero): Observable<Response> {
    return this.mockAPI.editHero(hero).pipe(
      catchError(error => {
        console.error(error);
        this.mockApiErrorResponse.result = this.mockApiErrorResult('editHero');
        return of(this.mockApiErrorResponse);
      })
    )
  }

  deletehero(paramId: number): Observable<Response> {
    return this.mockAPI.deleteHero(paramId).pipe(
      catchError(error => {
        console.error(error);
        this.mockApiErrorResponse.result = this.mockApiErrorResult('deleteHero');
        return of(this.mockApiErrorResponse);
      })
    )
  }

  searchHeroes(keyword: string): Observable<Response> {
    return this.mockAPI.fetchHeroesByName(keyword.toLowerCase()).pipe(
      catchError(error => {
        console.error(error);
        this.mockApiErrorResponse.result = this.mockApiErrorResult('searchHeroes');
        return of(this.mockApiErrorResponse);
      })
    )
  }
}
