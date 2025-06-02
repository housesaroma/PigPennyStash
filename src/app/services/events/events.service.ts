// services/events.service.ts
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEvent, IEventCreate, IEventMemberAdd } from '../../interfaces/event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private apiUrl = 'https://ppsapi.onrender.com/api/events';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  getEventById(id: string): Observable<IEvent> {
    return this.http.get<IEvent>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  createEvent(eventData: IEventCreate): Observable<IEvent> {
    // Если members не указан, отправляем пустой массив
    const dataToSend = {
      ...eventData,
      members: eventData.members || []
    };
    return this.http.post<IEvent>(this.apiUrl, dataToSend, {
      headers: this.getAuthHeaders()
    });
  }

  updateEvent(id: string, eventData: IEventCreate): Observable<IEvent> {
    const dataToSend = {
      ...eventData,
      members: eventData.members || []
    };

    return this.http.put<IEvent>(`${this.apiUrl}/${id}`, dataToSend, {
      headers: this.getAuthHeaders()
    });
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  addEventMember(eventId: string, memberData: IEventMemberAdd): Observable<IEvent> {
    return this.http.post<IEvent>(`${this.apiUrl}/${eventId}/members`, memberData, {
      headers: this.getAuthHeaders()
    });
  }
}
