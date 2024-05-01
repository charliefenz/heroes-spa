import { Injectable } from '@angular/core';
import { MockApiService } from '../../../mock-API/mock-api.service';
import { Response } from '../../../models/response';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  
  constructor(private mockAPI: MockApiService) { 
  }

  getHeroes(): Observable<Response> {
    // with pipe the observable is resent to any item injecting this service
    // just like httpClient would do
    return this.mockAPI.getHeroes().pipe(
      catchError(error => {
        console.error('Error fetching data for getting heroes list', error);
        throw error;
      })
    )
  }
}
