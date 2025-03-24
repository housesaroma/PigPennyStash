import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RegistrationService } from '../../../services/registration/registration.service';
import { RegistrationStep2 } from '../../../interfaces/registration.interface';

@Component({
  selector: 'registration-app-step2',
  templateUrl: './registration-step2.page.html',
  styleUrls: ['./registration-step2.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule]
})
export class RegistrationStep2Page implements OnInit {
  registrationStep2Form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registrationService: RegistrationService
  ) {
    this.registrationStep2Form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
  }

  onNext() {
    if (this.registrationStep2Form.valid) {
      const step2Data: RegistrationStep2 = this.registrationStep2Form.value;
      this.registrationService.setStep2Data(step2Data);

      this.router.navigate(['/registration-step3']);
    }
  }
}
