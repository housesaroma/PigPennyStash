import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../services/data/data.service';
import { Event } from '../../interfaces/event.interface';
import { CreateEventPage } from '../create-event/create-event.page';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgOptimizedImage,
  ]
})
export class EventsPage implements OnInit {
  events: Event[] = [];
  passImage = "./assets/avatars/1.jpg";
  private eventsUrl = 'assets/events.json';

  constructor(
    private modalCtrl: ModalController,
    private dataService: DataService
  ) {
    console.log('Текущий путь к JSON:', this.eventsUrl);
  }

  ngOnInit() {
    this.initializeEvents();
    console.log("Current events:", this.events)
  }

  initializeEvents() {
    const storedEvents = localStorage.getItem('events');

    if (!storedEvents) {
      this.dataService.getData<Event[]>(this.eventsUrl).subscribe({
        next: (events: Event[]) => {
          console.log('Загруженные события:', events);

          const eventsWithIds = events.map((event, index) => ({
            ...event,
            id: index + 1
          }));

          localStorage.setItem('events', JSON.stringify(eventsWithIds));

          // Обновляем список событий
          this.events = eventsWithIds;
        },
        error: (error) => {
          console.error('Ошибка загрузки событий', error);
        }
      });
    } else {
      this.events = JSON.parse(storedEvents);
    }
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: CreateEventPage,
    });

    modal.onDidDismiss().then(() => {
      const updatedStoredEvents = localStorage.getItem('events');
      if (updatedStoredEvents) {
        this.events = JSON.parse(updatedStoredEvents);
      }
    });

    return await modal.present();
  }

  async openEditModal(event: Event) {
    const modal = await this.modalCtrl.create({
      component: CreateEventPage,
      componentProps: { eventToEdit: event }
    });
    return await modal.present();
  }
}
