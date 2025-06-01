import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar, IonIcon, IonButton, IonPopover, IonToast, IonRefresher, IonRefresherContent, IonSpinner } from '@ionic/angular/standalone';
import { Contact } from 'src/app/models/contact.model';
import { DataService } from '../../services/data/data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactsService, UserContacts } from 'src/app/services/contacts/contacts.service';
import { EventOptionsPopoverComponent } from "../../components/event-options-popover/event-options-popover.component";
import { AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { ellipsisVerticalOutline, personOutline } from 'ionicons/icons';
import { ModalController } from '@ionic/angular'
import { PhoneInputPage } from '../phone-input/phone-input.page';
import { listAnimate } from 'src/app/animations/list-animation';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonPopover, IonButton, IonIcon,
    IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule, IonList, IonItem,
    IonLabel, IonAvatar, IonToast],
  providers: [AlertController, ModalController],
  animations: [listAnimate()]
})
export class ContactsPage implements OnInit {
  @ViewChild('popover') popover!: HTMLIonPopoverElement;
  popoverEvent: Event | null = null;
  contacts: UserContacts[] = [];
  isLoading = true;

  // private mapUserContactToContact(userContact: UserContacts): Contact {
  //   return new Contact({
  //     id: userContact.id,
  //     name: userContact.name,
  //     events: [],
  //     avatar: userContact.avatar ?? "",
  //     ownContribution: 0
  //   });
  // }


  constructor(private dataService: DataService, private http: HttpClient, private contactservice: ContactsService, private alertController: AlertController, private modalCtrl: ModalController) {
    addIcons({ personOutline, ellipsisVerticalOutline });
  }

  ngOnInit() {
    // this.dataService.getData<Contact[]>(this._dataUrl).subscribe(data => {
    //   this.contacts = data;
    // });
    this.contactservice.getCurrentUser().subscribe(uuid => {
      this.contactservice.getContacts().subscribe(r => {
        this.contacts = r;
        console.log(this.contacts);
        this.isLoading = false;
      })
    })
  }

  isUnknownNumberError: boolean = false;
  isConflictNumberError: boolean = false;
  async openPhoneModal() {
    const modal = await this.modalCtrl.create({
      component: PhoneInputPage
    });

    await modal.present();

    const phoneFromModal = (await modal.onDidDismiss()).data;
    console.log(phoneFromModal);
    if (phoneFromModal && phoneFromModal.length === 17) {
      // console.log('Введённый номер:', phoneFromModal.data);
      //начинаем здесь
      this.contactservice.addContact(phoneFromModal).subscribe({
        next: () => {
          this.contactservice.getContacts().subscribe(r => {
            this.contacts = r
          })},
        error: (err) => {
          if (err.status === 400) {
            //когда номера нет такого
            this.isUnknownNumberError = true;
            setTimeout(() => this.isUnknownNumberError = false, 3000);
          }
          if (err.status === 409){
            //такой номер уже есть или это мой номер
            this.isConflictNumberError = true;
            setTimeout(() => this.isConflictNumberError = false, 3000);
          }
        }
      });
    }
  }

  public toastButtons = [
    {
      text: 'OK',
      role: 'cancel',
    },
  ];

  selectedContact: UserContacts | null = null;
  isOpen = false;
  presentPopover(e: Event, contact: UserContacts) {
    this.popoverEvent = e;
    this.selectedContact = contact;
    this.isOpen = true;
  }

  async presentAlert(contact: UserContacts | null) {
    if (!contact) return;
    const alert = await this.alertController.create({
      header: 'Подтверждение',
      message: 'Вы уверены, что хотите удалить это событие?',
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Удаление отменено');
            // this.popover.dismiss();
            this.isOpen = false;
          }
        },
        {
          text: 'Удалить',
          handler: () => {
            const userID = contact.contactId;
            console.log(userID);
            this.contactservice.deleteContact(userID)
              .subscribe({
                next: () => {
                  // this.contacts = this.contacts.filter(c => c.id !== userID);
                  // this.popover.dismiss();
                  this.isOpen = false;
                  this.contactservice.getContacts().subscribe(r => this.contacts = r)
                }
              })
            // Логика удаления элемента
          }
        }
      ]
    });
    await alert.present();
  }
}
