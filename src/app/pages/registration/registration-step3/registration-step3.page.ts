import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {RegistrationService} from '../../../services/registration/registration.service';
import {RegistrationStep3} from '../../../interfaces/registration.interface';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'registration-app-step3',
  templateUrl: './registration-step3.page.html',
  styleUrls: ['./registration-step3.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule]
})
export class RegistrationStep3Page implements OnInit {
  registrationStep3Form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registrationService: RegistrationService,
    private authService: AuthService
  ) {
    this.registrationStep3Form = this.fb.group({
      address: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.registrationStep3Form.valid) {
      const step3Data: RegistrationStep3 = this.registrationStep3Form.value;
      this.registrationService.setStep3Data(step3Data);

      const registrationData = this.registrationService.getRegistrationData();

      // Отправляем данные на сервер
      this.authService.register();
      this.router.navigate(['/tabs']);
    }
  }
}
