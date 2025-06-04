import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGoal } from 'src/app/interfaces/goal.interface';

@Injectable({
  providedIn: 'root'
})
export class GoalsServiceService {

  private readonly API_URL: string = 'https://ppsapi.onrender.com/api';
  
  constructor(private http: HttpClient) { }

  getGoals(): Observable<IGoal[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<IGoal[]>(`${this.API_URL}/goals`, { headers });
  }

  createGoal(newGoal: IGoal): Observable<IGoal> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<IGoal>(`${this.API_URL}/goals`, newGoal, { headers });
  }

  updateGoal(goalToUpdate: IGoal, goalId: string | undefined): Observable<IGoal> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    console.log(goalId);
    return this.http.put<IGoal>(`${this.API_URL}/goals/${goalId}`, goalToUpdate, { headers })
  }

  removeGoal(goalId: string | undefined): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<void>(`${this.API_URL}/goals/${goalId}`, { headers });
  }
}
