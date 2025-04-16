import { Component, ModelFunction } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IEvent } from '../../interfaces/event.interface';
import {
  addCircleOutline,
  trashOutline
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ContactsService } from 'src/app/services/contacts/contacts.service';
import { Contact } from 'src/app/models/contact.model';
import { Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'create-add-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule]
})
export class CreateEventPage {
  @Input() eventToEdit?: IEvent;
  contacts: Contact[] = [];
  selectedMembers: Contact[] = [];

  constructor(
    private router: Router,
    private contactsService: ContactsService,
    private modalCtrl: ModalController) {
    addIcons({ addCircleOutline, trashOutline })
    this.contactsService.getContacts().subscribe(
      data => this.contacts = data
    )
  }

  ngOnInit() {
    if (this.eventToEdit) {
      // Если передан eventToEdit, заполняем форму его данными
      this.createEventForm.patchValue({
        title: this.eventToEdit.title,
        totalAmount: this.eventToEdit.totalAmount,
        deadline: this.eventToEdit.deadline
      });

      // Устанавливаем выбранных участников
      this.selectedMembers = [...this.eventToEdit.members];

      // Обновляем FormControl для members
      this.createEventForm.get('members')?.setValue(this.selectedMembers);
    }
  }

  protected createEventForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    totalAmount: new FormControl(null),
    members: new FormControl(),
    deadline: new FormControl()
  });

  onMembersSelectionChange(event: any) {
    // Обновляем выбранных участников на основе значения формового контроля
    const newSelectedMembers = event.detail.value;

    // При редактировании существующего события убеждаемся, что мы не теряем ранее выбранных участников
    if (this.eventToEdit) {
      this.selectedMembers = [...new Set([...this.selectedMembers, ...newSelectedMembers])];
    } else {
      this.selectedMembers = newSelectedMembers;
    }

    // Обновляем значение формового контроля
    this.createEventForm.get('members')?.setValue(this.selectedMembers);
  }

  onAddCurrentContribution(event: any, index: number) {
    const contributionValue = event.target.value;
    this.selectedMembers[index].ownContribution = contributionValue;
  }

  saveEvent() {
    const storedEvents = localStorage.getItem('events');
    let events: IEvent[] = storedEvents ? JSON.parse(storedEvents) : [];

    // Проверка на дубликат (только для новых событий)
    if (!this.eventToEdit) {
      const isDuplicate = events.some(e => e.title === this.createEventForm.get('title')?.value);
      if (isDuplicate) return;
    }

    const eventData: IEvent = {
      id: this.eventToEdit ? this.eventToEdit.id : this.generateId(events),
      title: this.createEventForm.controls['title'].value,
      totalAmount: this.createEventForm.controls['totalAmount'].value,
      deadline: this.createEventForm.controls['deadline'].value,
      members: this.selectedMembers
    };

    if (this.eventToEdit) {
      // Обновляем существующее событие
      events = events.map(e => e.id === this.eventToEdit?.id ? eventData : e);
    } else {
      // Добавляем новое событие
      events.push(eventData);
    }

    localStorage.setItem('events', JSON.stringify(events));
    //this.selectedMembers = [];
    //логирование чтобы посмотреть
    console.log("Event:", eventData);
    // if (this.eventToEdit) {
    //   this.modalCtrl.dismiss('close');
    // }
    this.modalCtrl.dismiss();
    this.router.navigate(['/tabs/events']);
  }

  removeMember(index: number) {
    this.selectedMembers.splice(index, 1);
    this.selectedMembers = [...this.selectedMembers];
  }

  private generateId(events: IEvent[]): number {
    return events.length > 0
      ? Math.max(...events.map(e => e.id)) + 1
      : 1;
  }
}
