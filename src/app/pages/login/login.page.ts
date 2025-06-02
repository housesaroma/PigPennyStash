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
  IonTitle,
  IonToast,
  IonToolbar
} from '@ionic/angular/standalone';
import {LoginFormViewModel} from "../../view-models/login-form.view-model";
import {ValidatorMessageComponent} from "../../components/validator-message/validator-message.component";
import {LoginFormInterface} from "../../interfaces/login.form.interface";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {PasswordStrengthValidatorDirective} from "../../directives/password-strength-validator.directive";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ValidatorMessageComponent,
    IonLabel,
    IonItem,
    IonInput,
    IonButton,
    PasswordStrengthValidatorDirective,
    IonToast
  ]
})
export class LoginPage {
  protected loginFormVM: LoginFormViewModel = new LoginFormViewModel();
  protected loginForm: FormGroup<LoginFormInterface> = this.loginFormVM.form;
  protected showErrorToast: boolean = false;
  protected errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  protected onSubmit(): void {
    if (this.loginForm.valid) {
      const {userEmail, userPassword} = this.loginForm.value;

      this.authService.login(userEmail!, userPassword!).subscribe({
        next: () => {
          this.router.navigate(['/tabs']);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Ошибка при входе';
          this.showErrorToast = true;
        }
      });
    }
  }

   goRegister(): void {
    this.router.navigate(['/registration']);
  }
}
