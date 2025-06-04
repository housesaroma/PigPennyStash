import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

  ngOnInit() {
  }

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
      next: () => {
        console.log("Транзакция добавлена");
      }
    })
    this.modalCtrl.dismiss();
  }
}