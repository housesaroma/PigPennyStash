import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { Transaction } from 'src/app/interfaces/transaction.interface';
import { DataService } from 'src/app/services/data/data.service';
import { Data } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TransactionPage implements OnInit {
  transactions: Transaction[] = [];
  transUrl = 'assets/transactions.json';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getStoredTransactions();
  }
  getStoredTransactions() {
    const transData = localStorage.getItem('trans');
    if (!transData) {
      this.dataService.getData<Transaction[]>(this.transUrl)
        .subscribe({
          next: (_trans: Transaction[]) => {
            console.log("Загруженные транзакции: ", _trans);
            localStorage.setItem('trans', JSON.stringify(_trans));
            this.transactions = _trans;
          },
          error: (err) => {
            console.log("Ошибка при загрузке транзакций: ", err);
          }})
    }
    else {
      this.transactions = JSON.parse(transData);
    }
  }

}
