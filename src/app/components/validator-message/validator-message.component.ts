import {Component, Input} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  standalone: true,
  selector: 'validator-message-component',
  templateUrl: './validator-message.component.html',
  styleUrls: ['./validator-message.component.scss'],
  imports: [
    NgIf
  ]
})
export class ValidatorMessageComponent {
  @Input()
  public control!: AbstractControl;

  @Input()
  public errorMessage!: string;
}
