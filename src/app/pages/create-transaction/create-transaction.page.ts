import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonItem, IonLabel, IonSelectOption, IonModal, IonDatetimeButton } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { Transaction } from 'src/app/interfaces/transaction.interface';
import { ModalController } from '@ionic/angular';
import { TransactionServiceService } from 'src/app/services/transaction/transaction-service.service';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.page.html',
  styleUrls: ['./create-transaction.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule]
})
export class CreateTransactionPage implements OnInit {

  constructor(private modalCtrl: ModalController, private transService: TransactionServiceService) { }

  protected addTransactionForm = new FormGroup({
    title: new FormControl(),
    sum: new FormControl(),
    date: new FormControl(),
    type: new FormControl()
  })

  saveTransaction() {
    const body = this.addTransactionForm.value as Transaction;
    body.sum = +body.sum;
    body.date = new Date(body.date + 'Z');
    this.transService.createTransaction(body).subscribe({
      next: () => console.log("Транзакция добавлена")
    })
    this.modalCtrl.dismiss();
    // const storedTrans = localStorage.getItem('trans');
    // let trans: Transaction[] = storedTrans ? JSON.parse(storedTrans) : [];

    // let userDate = this.addTransactionForm.controls['date']?.value;
    // if (!userDate) {
    //   userDate = new Date();
    // }

    // const transData: Transaction = {
    //   title: this.addTransactionForm.controls['title']?.value,
    //   sum: this.addTransactionForm.controls['amount']?.value,
    //   date: userDate,
    //   type: this.addTransactionForm.controls['type']?.value
    // };

    // trans.push(transData);
    // localStorage.setItem('trans', JSON.stringify(trans));
    // this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
