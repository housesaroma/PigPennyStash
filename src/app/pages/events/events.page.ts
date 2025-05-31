// events.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { EventsService } from '../../services/events/events.service';
import { IEvent } from '../../interfaces/event.interface';
import { CreateEventPage } from '../create-event/create-event.page';
import { addIcons } from 'ionicons';
import { ellipsisVerticalOutline } from 'ionicons/icons';
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
    EventOptionsPopoverComponent
  ]
})
export class EventsPage implements OnInit {
  events: IEvent[] = [];
  isLoading = true;

  constructor(
    private modalController: ModalController,
    private eventsService: EventsService
  ) {
    addIcons({ ellipsisVerticalOutline });
  }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents(event?: any) {
    this.isLoading = true;
    this.eventsService.getAllEvents().subscribe({
      next: (events) => {
        this.events = events;
        this.isLoading = false;
        if (event) event.target.complete();
      },
      error: (error) => {
        console.error('Error loading events', error);
        this.isLoading = false;
        if (event) event.target.complete();
      }
    });
  }

  deleteEvent(event: IEvent) {
    this.eventsService.deleteEvent(event.id).subscribe({
      next: () => {
        this.events = this.events.filter(e => e.id !== event.id);
      },
      error: (error) => {
        console.error('Error deleting event', error);
      }
    });
  }

  getProgressPercent(event: IEvent): number {
    const total = event.members.reduce((sum, member) => sum + member.amount, 0);
    return Math.round((total / event.totalAmount) * 100);
  }

  getProgressColor(event: IEvent): string {
    const percent = this.getProgressPercent(event);
    if (percent >= 100) return 'success';
    if (percent >= 50) return 'warning';
    return 'danger';
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: CreateEventPage
    });

    modal.onDidDismiss().then((result) => {
      if (result.data?.refresh) {
        this.loadEvents();
      }
    });

    await modal.present();
  }

  async openEditModal(event: IEvent) {
    const modal = await this.modalController.create({
      component: CreateEventPage,
      componentProps: { eventToEdit: event }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data?.refresh) {
        this.loadEvents();
      }
    });

    await modal.present();
  }
}
