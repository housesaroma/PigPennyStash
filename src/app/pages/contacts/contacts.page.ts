import { Component, OnInit } from '@angular/core';
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
  IonToolbar
} from '@ionic/angular/standalone';
import { Contact } from '../../interfaces/contact.interface';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule, IonList, IonItem,
    IonLabel, IonAvatar, NgOptimizedImage
  ]
})
export class ContactsPage implements OnInit {
  contacts: Contact[] = [];
  private _dataUrl = '/assets/contacts.json';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData<Contact[]>(this._dataUrl).subscribe(data => {
      this.contacts = data;
    });
  }
}
