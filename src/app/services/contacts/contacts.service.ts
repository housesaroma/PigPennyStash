import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, map} from "rxjs";
import { Contact } from 'src/app/models/contact.model';

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  createdAt: Date;  // или string
  updatedAt: Date;
}

export interface UserContacts {
  contactId: string,
  contactUserId: string,
  ownContribution: number | 0;
  id: string;
  name: string;
  avatar: string | null;
  email: string;
  phone: string;
  createdAt: string;
  status: string;
  isOwner: boolean;
  otherUserId: string;
}

interface AddContact {
  contactId?: string,
  contactEmail?: string,
  contactPhone: string,
  contactName?: string
}


@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  // private _url = '/assets/contacts.json';
  private readonly API_URL: string = 'https://ppsapi.onrender.com/api';
  private currentUUID: string | null = null;

  constructor(private http: HttpClient) {
  }

  //получаем uuid текущего пользователя
  getCurrentUser(): Observable<UserContacts> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<UserContacts>(`${this.API_URL}/users/me`, { headers }).pipe(
      map(response => {
        this.currentUUID = response.id;
        return response;
      }),
      catchError(error => {
        console.error('Ошибка загрузки текущего пользователя:', error);
        return of()
      })
    )
  }

  getContacts(): Observable<UserContacts[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<UserContacts[]>(`${this.API_URL}/contacts/user/${this.currentUUID}`, { headers });
  }

  getContactByUUID(uuid: string): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/users/${uuid}`);
  }

  addContact(phone: string): Observable<AddContact> {
    const token = localStorage.getItem('token');
    const body: AddContact = {contactPhone: phone};
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    console.log(body);
    return this.http.post<AddContact>(`${this.API_URL}/contacts`, body, { headers });
  }

  deleteContact(uuid: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.API_URL}/contacts/user/${uuid}`, { headers });
  }

  // getContacts(): Observable<Contact[]> {
  //   return this.http.get<Contact[]>(this._url).pipe(
  //     catchError(error => {
  //       console.error('Ошибка при загрузке контактов:', error);
  //       return of([]);
  //     })
  //   );
  // }
}
