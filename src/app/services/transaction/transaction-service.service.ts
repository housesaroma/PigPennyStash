import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionTypes } from 'src/app/interfaces/transaction.interface';


interface GetTransaction {
    id: string,
    title: string,
    sum: number,
    type: TransactionTypes,
    date: Date,
    status: string,
    accountId: string,
    categoryId: string,
    description: string,
    tags: string[],
    createdAt: Date,
    updatedAt: Date,
    userId: string
}

@Injectable({
  providedIn: 'root'
})
export class TransactionServiceService {

  constructor(private http: HttpClient) { }

  private readonly API_URL: string = 'https://ppsapi.onrender.com/api';

  getTransactions(): Observable<GetTransaction> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<GetTransaction>(`${this.API_URL}/transactions`, { headers });
  }

  addTransaction():
}
