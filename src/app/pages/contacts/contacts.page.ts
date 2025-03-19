import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Contact} from "../../interfaces/contact.interface";
import {ContactsService} from "../../services/contacts.service";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel, IonAvatar, NgOptimizedImage]
})
export class ContactsPage implements OnInit {

  contacts: Contact[] = [];

  constructor(private contactsService: ContactsService) {
  }

  ngOnInit() {
    this.contactsService.getContacts().subscribe(data => {
      this.contacts = data;
    })
  }
}
