import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import { Contact } from 'src/app/models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private _url = '/assets/contacts.json';

  constructor(private _http: HttpClient) {
  }

  getContacts(): Observable<Contact[]> {
    return this._http.get<Contact[]>(this._url).pipe(
      catchError(error => {
        console.error('Ошибка при загрузке контактов:', error);
        return of([]); // Возвращаем пустой массив в случае ошибки
      })
    );
  }
}
