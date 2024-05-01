import { Injectable } from '@angular/core';
import { MockApiService } from '../../../mock-API/mock-api.service';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  
  constructor(private mockAPI: MockApiService) { 
  }
}
