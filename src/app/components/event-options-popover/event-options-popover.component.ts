import { Component, OnInit, ViewChild } from '@angular/core';
import { IonButton, IonPopover, IonContent, IonIcon, IonList, IonItem } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { ellipsisVerticalOutline } from 'ionicons/icons';

@Component({
  selector: 'app-event-options-popover',
  templateUrl: './event-options-popover.component.html',
  styleUrls: ['./event-options-popover.component.scss'],
  imports: [IonItem, IonList, IonButton, IonPopover, IonContent, IonIcon]
})
export class EventOptionsPopoverComponent  implements OnInit {

  @ViewChild('popover') popover!: HTMLIonPopoverElement;

  constructor() {
    addIcons({ellipsisVerticalOutline})
  }

  isOpen = false;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  ngOnInit(): void {
  }
}
