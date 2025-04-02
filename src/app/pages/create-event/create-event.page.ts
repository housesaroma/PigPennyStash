import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'create-add-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule]
})
export class CreateEventPage {
  newEvent: Omit<Event, 'id'> = {
    title: '',
    members: [],
    totalAmount: null
  };
  protected newMember: Contact | null = null;
  protected contacts: Contact[] = [];

  protected createEventForm: FormGroup = new FormGroup({
    title: new FormControl('test', Validators.required),
    members: new FormControl([], Validators.required),
    totalAmount: new FormControl('', Validators.required)
  })

  constructor(private router: Router, private contactsService: ContactsService) {
    addIcons({ addCircleOutline, trashOutline})
    this.contactsService.getContacts().subscribe(
      data => this.contacts = data
    )
  }

  addMember() {
    if (this.newMember) {
      this.newEvent.members.push(this.newMember);
      this.newMember = null;
    }
  }

  removeMember(index: number) {
    // this.newEvent.members.splice(index, 1);
    // this.newEvent.members = [...this.newEvent.members];
    this.createEventForm.get('members')?.value.splice(index, 1);
  }

  saveEvent() {
    const storedEvents = localStorage.getItem('events');
    const events: Event[] = storedEvents ? JSON.parse(storedEvents) : [];
    const isDuplicate = events.some(e => e.title === this.createEventForm.controls['title'].value);

    if (isDuplicate) {
      return;
    }

    const event: Event = {
      id: this.generateId(events),
      title: this.createEventForm.controls['title'].value,
      members: this.createEventForm.controls['members'].value,
      totalAmount: this.createEventForm.controls['totalAmount'].value
    };

    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));
    this.router.navigate(['/tabs/events']);
    //логирование чтобы посмотреть
    console.log(
      "result", [event.title, event.members, event.totalAmount]
    )
  }

  private generateId(events: Event[]): number {
    return events.length > 0
      ? Math.max(...events.map(e => e.id)) + 1
      : 1;
  }
}
