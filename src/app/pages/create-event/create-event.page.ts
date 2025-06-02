// create-event.page.ts
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {IEvent, IEventCreate, IEventMember, IEventMemberAdd} from '../../interfaces/event.interface';
import { addIcons } from 'ionicons';
import {addCircleOutline, today, trashOutline} from 'ionicons/icons';
import { ContactsService, UserContacts } from '../../services/contacts/contacts.service';
import { EventsService } from '../../services/events/events.service';

@Component({
  selector: 'create-add-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule]
})
export class CreateEventPage {
  @Input() eventToEdit?: IEvent;
  contacts: UserContacts[] = [];
  selectedMembers: IEventMember[] = [];
  accumulatedSum: number = 0;
  isLoading = false;

  createEventForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    totalAmount: new FormControl(null, [Validators.required, Validators.min(1)]),
    deadline: new FormControl(null, [Validators.required])
  });

  constructor(
    private contactsService: ContactsService,
    protected modalCtrl: ModalController,
    private eventsService: EventsService,
    private toastCtrl: ToastController
  ) {
    addIcons({ addCircleOutline, trashOutline });
    this.loadContacts();
  }

  ngOnInit() {
    if (this.eventToEdit) {
      this.createEventForm.patchValue({
        title: this.eventToEdit.title,
        totalAmount: this.eventToEdit.totalAmount,
        deadline: this.eventToEdit.deadline
      });

      // Calculate accumulated sum
      this.accumulatedSum = this.eventToEdit.members.reduce((sum, member) => sum + member.amount, 0);

      // Создание выбранных участников с учетом новых типов
      this.selectedMembers = this.eventToEdit.members.map(member => ({
        id: member.id,
        eventId: member.eventId,
        userId: member.userId,
        amount: member.amount,
        user: member.user
      }));
    }
  }

  loadContacts() {
    this.contactsService.getCurrentUser().subscribe(uuid => {
      this.contactsService.getContacts().subscribe(data => {
        this.contacts = data;
      })
    })
  }

  onMembersSelectionChange(event: any) {
    const selectedContactIds = event.detail.value;
    console.log('Выбранные ID контактов:', selectedContactIds);

    // Добавляем новых выбранных контактов
    selectedContactIds.forEach((contactId: string) => {
      // Проверьте, не добавлен ли этот контакт ранее
      if (!this.selectedMembers.some(m => m.user.contactId === contactId)) {
        const contact = this.contacts.find(c => c.contactId === contactId);
        console.log('Добавляемый контакт:', contact);
        if (contact) {
          this.selectedMembers.push({
            id: contact.contactId,
            eventId: event.detail.eventId,
            userId: contact.contactUserId,
            amount: 0,
            user: contact
          });
        }
      }
    });
  }

  onAmountChange(amount: string | number | null | undefined, index: number) {
    const parsedAmount = amount ? Number(amount) : 0;
    this.selectedMembers[index].amount = parsedAmount;
    this.calculateAccumulatedSum();
  }

  calculateAccumulatedSum() {
    this.accumulatedSum = this.selectedMembers.reduce((sum, member) => sum + (member.amount || 0), 0);
  }

  removeMember(index: number) {
    this.selectedMembers.splice(index, 1);
    this.calculateAccumulatedSum();
  }

  async saveEvent() {
    if (this.createEventForm.invalid) {  // Убрали проверку на участников
      this.showToast('Пожалуйста, заполните все обязательные поля');
      return;
    }

    this.isLoading = true;

    const eventData: IEventCreate = {
      title: this.createEventForm.value.title,
      totalAmount: this.createEventForm.value.totalAmount,
      deadline: new Date(this.createEventForm.value.deadline).toISOString(),
      members: this.selectedMembers.length > 0  // Добавляем участников только если они есть
        ? this.selectedMembers.map(member => ({
          userId: member.user.contactUserId ||  member.user.id,
          amount: member.amount || 0,
        }))
        : []
    };

    console.log('Отправляемые данные:', eventData);
    console.log('selectedMembers:', this.selectedMembers);

    try {
      if (this.eventToEdit) {
        console.log(this.eventToEdit.id);
        await this.eventsService.updateEvent(this.eventToEdit.id, eventData).toPromise();
        this.showToast('Событие успешно обновлено');
      } else {
        await this.eventsService.createEvent(eventData).toPromise();
        this.showToast('Событие успешно создано');
      }

      this.modalCtrl.dismiss({ refresh: true });
    } catch (error) {
      console.error('Error saving event', error);
      this.showToast('Ошибка при сохранении события');
    } finally {
      this.isLoading = false;
    }
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'top'
    });
    await toast.present();
  }

  get totalEventAmount(): number {
    return this.createEventForm.value.totalAmount || 0;
  }

  protected readonly today = today;
}
