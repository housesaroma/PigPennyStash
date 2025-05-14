import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonIcon, IonButton, IonButtons } from '@ionic/angular/standalone';
import { Transaction } from 'src/app/interfaces/transaction.interface';
import { DataService } from 'src/app/services/data/data.service';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { arrowForwardOutline, arrowBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { TransactionTypes } from 'src/app/interfaces/transaction.interface';
import { routes } from 'src/app/tabs/tabs.routes'
import { ModalController } from '@ionic/angular';
import { CreateTransactionPage } from '../create-transaction/create-transaction.page';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
  standalone: true,
  imports: [IonButtons, IonButton, IonIcon, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  providers: [ModalController]
})
export class TransactionPage implements OnInit {
  transactions: Transaction[] = [];
  transUrl = 'assets/transactions.json';

  constructor(private dataService: DataService, private router: Router, private modalCtrl: ModalController, private route: ActivatedRoute) {
    addIcons({ arrowBackOutline, arrowForwardOutline });
  }

  ngOnInit() {
    this.getStoredTransactions();
  }

  getStoredTransactions() {
    const transData = localStorage.getItem('trans');
    if (!transData) {
      this.dataService.getData<Transaction[]>(this.transUrl)
        .subscribe({
          next: (_trans: Transaction[]) => {
            localStorage.setItem('trans', JSON.stringify(_trans));
            this.transactions = _trans;
          },
          error: (err) => {
            console.log("Ошибка при загрузке транзакций: ", err);
          }
        })
    }
    else {
      this.transactions = JSON.parse(transData);
      console.log("Загруженные транзакции: ", this.transactions);
    }
  }

  toSettings() {
    this.router.navigate(['/tabs/settings']);
  }

  async createTransaction() {
    const transactionModal = await this.modalCtrl.create({
      component: CreateTransactionPage
    });
    transactionModal.onDidDismiss().then(() => {
      this.getStoredTransactions();
    })
    return await transactionModal.present();
  }

}
