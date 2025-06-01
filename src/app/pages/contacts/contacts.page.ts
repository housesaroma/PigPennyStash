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
  IonToolbar, IonIcon, IonButton, IonPopover } from '@ionic/angular/standalone';
import { Contact } from 'src/app/models/contact.model';
import { DataService } from '../../services/data/data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactsService, UserContacts } from 'src/app/services/contacts/contacts.service';
import { EventOptionsPopoverComponent } from "../../components/event-options-popover/event-options-popover.component";
import { AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { ellipsisVerticalOutline, personOutline } from 'ionicons/icons';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
  standalone: true,
  imports: [IonPopover, IonButton, IonIcon,
    IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule, IonList, IonItem,
    IonLabel, IonAvatar],
  providers: [AlertController]
})
export class ContactsPage implements OnInit {
  @ViewChild('popover') popover!: HTMLIonPopoverElement;
  popoverEvent: Event | null = null;
  contacts: Contact[] = [];

  private mapUserContactToContact(userContact: UserContacts): Contact {
  return new Contact({
    id: userContact.id,
    name: userContact.name,
    events: [],
    avatar: userContact.avatar ?? "",
    ownContribution: 0
  });
}
  

  constructor(private dataService: DataService, private http: HttpClient, private contactservice: ContactsService, private alertController: AlertController) {
    addIcons({personOutline, ellipsisVerticalOutline});
  }

  ngOnInit() {
    // this.dataService.getData<Contact[]>(this._dataUrl).subscribe(data => {
    //   this.contacts = data;
    // });
    this.contactservice.getCurrentUser().subscribe(uuid => {
      this.contactservice.getContacts().subscribe(r => {
        this.contacts = r.map(userContact => this.mapUserContactToContact(userContact));
        console.log(this.contacts);
      })
    })
  }

  isOpen = false;
  presentPopover(e: Event) {
    this.popoverEvent = e;
    this.isOpen = true;
  }

  async presentAlert(contact: Contact) {
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
            const userID = contact.id;
            console.log(userID);
            this.contactservice.deleteContact(userID)
            .subscribe({
              next: () => {
                this.contacts = this.contacts.filter(c => c.id !== userID);
                // this.popover.dismiss();
                this.isOpen = false;
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
