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
import {RegisterFormInterface} from "../../interfaces/register.form.interface";
import {IUserData, UserModel} from "../../models/user.model";
import {ValidatorMessageComponent} from "../../components/validator-message/validator-message.component";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, ValidatorMessageComponent, IonLabel, IonItem, IonInput, IonButton, IonList]
})
export class RegistrationPage {
  protected userList: UserModel[] = [];
  protected name: string = '';
  protected surname: string = '';
  protected password: string = '';
  protected email: string = '';
  protected address: string = '';
  protected phone: string = '';

  protected onSubmit(): void {
    const user: IUserData = {
      name: this.name,
      surname: this.surname,
      password: this.password,
      email: this.email,
      address: this.address,
      phone: this.phone,
    };

    this.userList.push(user);
  }

  protected registerForm!: FormGroup<RegisterFormInterface>;
  protected registerFormVM: RegisterFormViewModel = new RegisterFormViewModel(() => ({} as IUserData));

  protected user: IUserData = this.registerFormVM.toModel();

}
