import { Component} from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  constructor(private router: Router, private contactsService: ContactsService) {
    addIcons({ addCircleOutline, trashOutline})
    this.contactsService.getContacts().subscribe(
      data => this.contacts = data
    )
  }

  newEvent: Omit<Event, 'id'> = {
    title: '',
    members: [],
    totalAmount: null,
    deadline: null
  };
  contacts: Contact[] = [];
  selectedMembers: Contact[] = [];

  protected createEventForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    totalAmount: new FormControl(null),
    members: new FormControl(),
    deadline: new FormControl()
  });
  onMembersSelectionChange(event: any) {
    this.selectedMembers = event.detail.value;
  }

  onAddCurrentContribution(event: any, index: number) {
    const contributionValue = event.target.value;
    this.selectedMembers[index].ownContribution = contributionValue;
  }

  saveEvent() {
    const storedEvents = localStorage.getItem('events');
    const events: Event[] = storedEvents ? JSON.parse(storedEvents) : [];
    const isDuplicate = events.some(e => e.title === this.createEventForm.get('title')?.value);

    if (isDuplicate) {
      return;
    }

    const event: Event = {
      id: this.generateId(events),
      title: this.createEventForm.controls['title'].value,
      totalAmount: this.createEventForm.controls['totalAmount'].value,
      deadline: this.createEventForm.controls['deadline'].value,
      members: this.selectedMembers
    };

    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));
    this.router.navigate(['/tabs/events']);
    this.selectedMembers = [];
    //логирование чтобы посмотреть
    console.log(
      "result", [event.title, event.members, event.totalAmount, event.deadline]
    )
  }

  removeMember(index: number) {
    this.newEvent.members.splice(index, 1);
    this.newEvent.members = [...this.newEvent.members];
  }

  private generateId(events: Event[]): number {
    return events.length > 0
      ? Math.max(...events.map(e => e.id)) + 1
      : 1;
  }
}
