import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Event } from '../../interfaces/event.interface';
import {
  addCircleOutline,
  trashOutline
} from 'ionicons/icons';
import {addIcons} from 'ionicons';
import { ContactsService } from 'src/app/services/contacts/contacts.service';
import { Contact } from 'src/app/interfaces/contact.interface';

@Component({
  selector: 'create-add-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class CreateEventPage {
  newEvent: Omit<Event, 'id'> = {
    title: '',
    members: []
  };
  newMember = '';
  contacts: Contact[] = [];

  constructor(private router: Router, private contactsService: ContactsService) {
    addIcons({ addCircleOutline, trashOutline})
    this.contactsService.getContacts().subscribe(
      data => this.contacts = data
    )
  }

  addMember() {
    if (this.newMember.trim()) {
      this.newEvent.members.push(this.newMember.trim());
      this.newMember = '';
    }
  }

  removeMember(index: number) {
    this.newEvent.members.splice(index, 1);
  }

  saveEvent() {
    const storedEvents = localStorage.getItem('events');
    const events: Event[] = storedEvents ? JSON.parse(storedEvents) : [];
    const isDuplicate = events.some(e => e.title === this.newEvent.title);

    if (isDuplicate) {
      return;
    }

    const event: Event = {
      ...this.newEvent,
      id: this.generateId(events)
    };

    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));
    this.router.navigate(['/tabs/events']);
  }

  private generateId(events: Event[]): number {
    return events.length > 0
      ? Math.max(...events.map(e => e.id)) + 1
      : 1;
  }
}
