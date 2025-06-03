import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Transaction } from 'src/app/interfaces/transaction.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionServiceService {

  constructor(private http: HttpClient) { }

  private readonly API_URL: string = 'https://ppsapi.onrender.com/api';

  getTransactions(): Observable<Transaction[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Transaction[]>(`${this.API_URL}/transactions`, { headers });
  }

  createTransaction(newTransaction: Transaction): Observable<Transaction> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Transaction>(`${this.API_URL}/transactions`, newTransaction, { headers });
  }

  removeTransaction(transactionId: string | undefined): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<void>(`${this.API_URL}/transactions/${transactionId}`, { headers });
  }
}
