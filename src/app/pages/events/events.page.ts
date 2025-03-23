import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonAvatar, IonLabel } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { EventModalPage } from '../event-modal/event-modal.page';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
  standalone: true,
  imports: [IonLabel, IonAvatar, IonItem, IonList, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NgOptimizedImage],
  providers: [ModalController]
})
export class EventsPage implements OnInit {
  events = [
    { id: 1, title: 'Праздник дня рождения', members: ["Матвей, Степа, Яша"] },
    { id: 2, title: 'Встреча с друзьями', members: ["Матвей, Яша"] },
    { id: 3, title: 'Выплата зарплаты', members: ["Матвей, Саша"]},
  ]
  passImage = "./assets/avatars/1.jpg"
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
