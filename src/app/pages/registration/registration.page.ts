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
  IonToolbar,
  IonToast
} from '@ionic/angular/standalone';
import {RegisterFormViewModel} from "../../view-models/register-form.view-model";
import {IUserData, UserModel} from "../../models/user.model";
import {ValidatorMessageComponent} from "../../components/validator-message/validator-message.component";
import {PasswordStrengthValidatorDirective} from "../../directives/password-strength-validator.directive";
import {RegisterFormInterface} from "../../interfaces/register.form.interface";
import {PhoneFormatPipe} from "../../pipes/phone-format.pipe";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, ValidatorMessageComponent, IonLabel, IonItem, IonInput, IonButton, IonList, PasswordStrengthValidatorDirective, PhoneFormatPipe, IonToast]
})
export class RegistrationPage {
  protected currentStep: number = 1;
  protected totalSteps: number = 3;
  protected userList: UserModel[] = [];
  protected registerFormVM: RegisterFormViewModel = new RegisterFormViewModel(() => ({} as IUserData));
  protected registerForm: FormGroup<RegisterFormInterface> = this.registerFormVM.form;
  protected showErrorToast: boolean = false;
  protected errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  isCurrentStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.registerFormVM.controlMap.userName.valid &&
          this.registerFormVM.controlMap.userSurname.valid;
      case 2:
        return this.registerFormVM.controlMap.userEmail.valid &&
          this.registerFormVM.controlMap.userPassword.valid;
      case 3:
        return this.registerFormVM.controlMap.userPhone.valid;
      default:
        return false;
    }
  }

  protected onSubmit(): void {
    if (this.registerForm.valid && this.currentStep === this.totalSteps) {
      const { userName, userEmail, userPassword, userPhone } = this.registerForm.value;

      this.authService.register(
        userName!,
        userEmail!,
        userPhone!,
        userPassword!
      ).subscribe({
        next: () => {
          this.registerForm.reset();
          this.currentStep = 1;
          this.router.navigate(['/tabs']);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Ошибка при регистрации';
          this.showErrorToast = true;
        }
      });
    }
  }
}
