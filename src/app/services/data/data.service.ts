import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(
      catchError(error => {
        console.error(`Ошибка при загрузке данных (${url}):`, error);
        return of([] as T);
      })
    );
  }
}
