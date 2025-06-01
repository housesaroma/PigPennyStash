import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonInput, IonLabel, IonButton, IonItem } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { PhoneFormatPipe } from "../../pipes/phone-format.pipe";
import { ValidatorMessageComponent } from "../../components/validator-message/validator-message.component";

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.page.html',
  styleUrls: ['./phone-input.page.scss'],
  standalone: true,
  imports: [IonItem, IonButton, IonLabel, IonInput, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, PhoneFormatPipe, ValidatorMessageComponent]
})
export class PhoneInputPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  phoneNumber: FormControl = new FormControl() //добавить валидатор телефона

  dismiss() {
    this.modalCtrl.dismiss();
  }

  confirm() {
    this.modalCtrl.dismiss(this.phoneNumber?.value);
  }
}
