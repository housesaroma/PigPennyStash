import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { EventModalPage } from '../event-modal/event-modal.page';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  providers: [ModalController]
})
export class EventsPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }
  ngOnInit() {
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: EventModalPage,
      cssClass: 'my-custom-modal-css'
    });
    return await modal.present();
  }

}
