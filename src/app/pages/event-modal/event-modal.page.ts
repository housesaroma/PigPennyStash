import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonInput, ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.page.html',
  styleUrls: ['./event-modal.page.scss'],
  standalone: true,
  imports: [IonInput, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EventModalPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }
  close() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }
}
