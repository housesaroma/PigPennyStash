import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {RegisterFormViewModel} from "../../view-models/register-form.view-model";
import {IUserData, UserModel} from "../../models/user.model";
import {ValidatorMessageComponent} from "../../components/validator-message/validator-message.component";
import {PasswordStrengthValidatorDirective} from "../../directives/password-strength-validator.directive";
import {RegisterFormInterface} from "../../interfaces/register.form.interface";
import {PhoneFormatPipe} from "../../pipes/phone-format.pipe";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, ValidatorMessageComponent, IonLabel, IonItem, IonInput, IonButton, IonList, PasswordStrengthValidatorDirective, PhoneFormatPipe]
})
export class RegistrationPage {
  protected userList: UserModel[] = [];
  protected registerFormVM: RegisterFormViewModel = new RegisterFormViewModel(() => ({} as IUserData));
  protected registerForm: FormGroup<RegisterFormInterface> = this.registerFormVM.form;

  protected onSubmit(): void {
    if (this.registerForm.valid) {
      const user = this.registerFormVM.toModel();
      this.userList.push(user);
      this.registerForm.reset();
    }
  }
}
