import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from "@angular/router";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToast,
  IonToolbar
} from '@ionic/angular/standalone';
import {ValidatorMessageComponent} from "../../components/validator-message/validator-message.component";
import {PasswordStrengthValidatorDirective} from "../../directives/password-strength-validator.directive";
import {RegisterFormInterface} from "../../interfaces/register.form.interface";
import {IUserData, UserModel} from "../../models/user.model";
import {PhoneFormatPipe} from "../../pipes/phone-format.pipe";
import {AuthService} from "../../services/auth/auth.service";
import {RegisterFormViewModel} from "../../view-models/register-form.view-model";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, ValidatorMessageComponent, IonLabel, IonItem, IonInput, IonButton, PasswordStrengthValidatorDirective, PhoneFormatPipe, IonToast]
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
  ) {
  }

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
      const {userName, userEmail, userPassword, userPhone} = this.registerForm.value;

      const formattedPhone = this.formatForServer(userPhone!);

      this.authService.register(
        userName!,
        userEmail!,
        formattedPhone!,
        userPassword!
      ).subscribe({
        next: () => {
          this.registerForm.reset();
          this.currentStep = 1;
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Ошибка при регистрации';
          this.showErrorToast = true;
        }
      });
    }
  }

  private formatForServer(phone: string): string {
    // Убираем все символы кроме цифр
    const cleaned = phone.replace(/\D/g, '');

    // Убираем первый символ '8' если есть
    if (cleaned && cleaned.startsWith('8') && cleaned.length > 1) {
      return '+7' + cleaned.slice(1);
    }

    // Добавляем код страны +7 для сервера
    if (cleaned && !cleaned.startsWith('7')) {
      return '+7' + cleaned.charAt(0) + cleaned.slice(1);
    }

    return '+7' + cleaned;
  }


  goLogin(): void {
    this.router.navigate(['/login']);
  }
}
