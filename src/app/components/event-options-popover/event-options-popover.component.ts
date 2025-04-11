import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonButton, IonPopover, IonContent, IonIcon, IonList, IonItem } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { ellipsisVerticalOutline } from 'ionicons/icons';
import { IEvent } from 'src/app/interfaces/event.interface';

@Component({
  selector: 'app-event-options-popover',
  templateUrl: './event-options-popover.component.html',
  styleUrls: ['./event-options-popover.component.scss'],
  imports: [IonItem, IonList, IonButton, IonPopover, IonContent, IonIcon]
})
export class EventOptionsPopoverComponent  implements OnInit {

  @ViewChild('popover') popover!: HTMLIonPopoverElement;
  @Input() currentEvent!: IEvent;
  @Input() openEditModal!:(event: IEvent) => void;

  constructor() {
    addIcons({ellipsisVerticalOutline})
  }

  isOpen = false;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  onEditEvent() {
    this.openEditModal(this.currentEvent);
  }

  ngOnInit(): void {
  }
}
