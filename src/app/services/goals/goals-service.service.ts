import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoalsServiceService {

  private readonly API_URL: string = 'https://ppsapi.onrender.com/api';
  
  constructor() { }
}
