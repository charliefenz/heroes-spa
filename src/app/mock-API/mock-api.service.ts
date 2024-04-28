import { Injectable } from '@angular/core';
import { Hero } from '../models/hero';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {

  private mockData: Array<Hero> = [
    {
      name: "Superman",
      id: 1,
      age: 30,
      isActive: false,
      image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/04d06f3a-e236-4c55-b728-6e1805d63453/dg152vc-afabac45-ed09-4b6c-ab57-82a99ea1d8f3.png/v1/fit/w_375,h_375,q_70,strp/superman_head_shot_i_fan_art_by_promptjourneys_dg152vc-375w.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcLzA0ZDA2ZjNhLWUyMzYtNGM1NS1iNzI4LTZlMTgwNWQ2MzQ1M1wvZGcxNTJ2Yy1hZmFiYWM0NS1lZDA5LTRiNmMtYWI1Ny04MmE5OWVhMWQ4ZjMucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.C7H2wNiV-qtoUS6dOq-8nySmvEf6JB2EvscujH76qUQ',
      superpowers: ['bullet-proof', 'fly', 'super strength']
    },
    {
      name: "Batman",
      id: 2,
      age: 32,
      isActive: false,
      image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a84027e7-f99b-4916-a894-6897a16f0893/d9x12il-b48deaff-ff2c-4f20-b749-1428bd513988.jpg/v1/fit/w_414,h_302,q_70,strp/the_dark_knight_by_se7enfaces_d9x12il-414w.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjQzIiwicGF0aCI6IlwvZlwvYTg0MDI3ZTctZjk5Yi00OTE2LWE4OTQtNjg5N2ExNmYwODkzXC9kOXgxMmlsLWI0OGRlYWZmLWZmMmMtNGYyMC1iNzQ5LTE0MjhiZDUxMzk4OC5qcGciLCJ3aWR0aCI6Ijw9ODgyIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.SjTPxES1bSLDoPPjrj-XlsyCeVYn8XiyugLTXdxlZmM',
      superpowers: ['super strength', 'technology', 'stealth']
    },
    {
      name: "Spiderman",
      id: 3,
      age: 35,
      isActive: true,
      image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a775c47a-795e-429a-a5aa-2883b79a5699/dgcqv2d-65bc0077-2f2a-483c-a7d5-86711c08095f.jpg/v1/fill/w_613,h_350,q_70,strp/spiderman_concept_art_by_x0ffset_dgcqv2d-350t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcL2E3NzVjNDdhLTc5NWUtNDI5YS1hNWFhLTI4ODNiNzlhNTY5OVwvZGdjcXYyZC02NWJjMDA3Ny0yZjJhLTQ4M2MtYTdkNS04NjcxMWMwODA5NWYuanBnIiwid2lkdGgiOiI8PTE3OTIifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.2JetimnM5HMU73iIndMobztyXTMYhBYFX-mWBYMuzfI',
      superpowers: ['spider web', 'climbing', 'agility']
    }
  ]

  constructor() { }
}
