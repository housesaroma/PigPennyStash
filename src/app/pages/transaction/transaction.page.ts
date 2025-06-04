import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonIcon, IonButton, IonButtons, IonAlert } from '@ionic/angular/standalone';
import { Transaction } from 'src/app/interfaces/transaction.interface';
import { DataService } from 'src/app/services/data/data.service';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { arrowForwardOutline, arrowBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { routes } from 'src/app/tabs/tabs.routes'
import { ModalController } from '@ionic/angular';
import { CreateTransactionPage } from '../create-transaction/create-transaction.page';
import { style } from '@angular/animations';
import { TransactionServiceService } from 'src/app/services/transaction/transaction-service.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonAlert, IonButtons, IonButton, IonIcon, 
    IonLabel, IonItem, IonList, IonContent, 
    IonHeader, IonTitle, IonToolbar, CommonModule, 
    FormsModule
  ],
  providers: [ModalController]
})
export class TransactionPage implements OnInit {
  transactions: Transaction[] = [];
  showAlert = false;
  selectedTransaction: Transaction | null = null;
  alertButtons = [
    {
      text: 'Отмена',
      role: 'cancel',
      handler: () => {
        console.log('Удаление отменено');
      }
    },
    {
      text: 'Удалить',
      role: 'confirm',
      handler: () => {
        this.deleteTransaction();
      }
    }
  ];

  constructor(private dataService: DataService, private router: Router, private modalCtrl: ModalController, private route: ActivatedRoute, private transactionService: TransactionServiceService, private cdr: ChangeDetectorRef) {
    addIcons({ arrowBackOutline, arrowForwardOutline });
  }

  ngOnInit() {
    this.transactionService.getTransactions().subscribe({
      next: (loadedTransactions) => {
        this.transactions = loadedTransactions;
        console.log("Загруженные транзакции: ", this.transactions);
        this.cdr.markForCheck();
      }
    })
  }

  updateTransactions() {
    this.transactionService.getTransactions().subscribe({
      next: (transList) => {
        this.transactions = transList;
        this.cdr.markForCheck();
        console.log("Список транзакций обновлен", this.transactions);
      }
    })
  }

  toSettings() {
    this.router.navigate(['/tabs/settings']);
  }

  async addTransaction() {
    const transactionModal = await this.modalCtrl.create({
      component: CreateTransactionPage
    });
    transactionModal.onDidDismiss().then(() => {
      setTimeout(() => this.updateTransactions(), 1000);
    })
    return await transactionModal.present();
  }

  presentDeleteConfirm(transaction: Transaction) {
    this.selectedTransaction = transaction;
    this.showAlert = true;
    this.cdr.markForCheck();
  }

  deleteTransaction() {
    this.transactionService.removeTransaction(this.selectedTransaction!.id).subscribe({
      next: () => {
        console.log("Транзакция удалена");
        this.selectedTransaction = null;
        this.cdr.markForCheck();
        this.updateTransactions();
      }
    })
  }
}
