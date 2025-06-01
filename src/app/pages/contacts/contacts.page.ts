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
  IonToolbar, IonIcon, IonButton, IonPopover
} from '@ionic/angular/standalone';
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


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
  standalone: true,
  imports: [IonPopover, IonButton, IonIcon,
    IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule, IonList, IonItem,
    IonLabel, IonAvatar],
  providers: [AlertController, ModalController]
})
export class ContactsPage implements OnInit {
  @ViewChild('popover') popover!: HTMLIonPopoverElement;
  popoverEvent: Event | null = null;
  contacts: UserContacts[] = [];

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
      })
    })
  }


  async openPhoneModal() {
    const modal = await this.modalCtrl.create({
      component: PhoneInputPage
    });

    await modal.present();

    const phoneFromModal = await modal.onDidDismiss();
    if (phoneFromModal) {
      // console.log('Введённый номер:', phoneFromModal.data);
      //начинаем здесь
      const phoneNumberValue = phoneFromModal.data;
      console.log(phoneNumberValue)
      this.contactservice.addContact(phoneNumberValue).subscribe({
        next: () => {
          this.contactservice.getContacts().subscribe(r => {
            this.contacts = r
          })
        }
      });
    }
  }

  isOpen = false;
  presentPopover(e: Event) {
    this.popoverEvent = e;
    this.isOpen = true;
  }

  async presentAlert(contact: UserContacts) {
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
