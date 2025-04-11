import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../services/data/data.service';
import { IEvent } from '../../interfaces/event.interface';
import { CreateEventPage } from '../create-event/create-event.page';
import { addIcons } from 'ionicons';
import { ellipsisVerticalOutline } from 'ionicons/icons';
import { IonPopover} from "@ionic/angular/standalone";
import { EventOptionsPopoverComponent } from 'src/app/components/event-options-popover/event-options-popover.component';

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
    EventOptionsPopoverComponent
  ]
})
export class EventsPage implements OnInit {
  events: IEvent[] = [];
  passImage = "./assets/avatars/1.jpg";
  private eventsUrl = 'assets/events.json';

  constructor(
    private modalController: ModalController,
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
      this.dataService.getData<IEvent[]>(this.eventsUrl).subscribe({
        next: (events: IEvent[]) => {
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
    console.log("Вызван")
    const modal = await this.modalController.create({
      component: CreateEventPage
    });

    modal.onDidDismiss().then(() => {
      const updatedStoredEvents = localStorage.getItem('events');
      if (updatedStoredEvents) {
        this.events = JSON.parse(updatedStoredEvents);
      }
    });

    return await modal.present();
  }

  async openEditModal(event: IEvent) {
    const modal = await this.modalController.create({
      component: CreateEventPage,
      componentProps: { eventToEdit: event }
    });
  
    modal.onDidDismiss().then((data) => {
      if (data.role === 'close') {
        this.initializeEvents();
      }
    });
    return await modal.present();
  }
}
