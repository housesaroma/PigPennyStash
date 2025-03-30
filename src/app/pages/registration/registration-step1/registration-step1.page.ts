import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {RegistrationStep1} from "../../../interfaces/registration.interface";
import {RegistrationService} from "../../../services/registration/registration.service";
import {ValidatorMessageComponent} from "../../../components/validator-message/validator-message.component";

@Component({
  selector: 'registration-app-step1',
  templateUrl: './registration-step1.page.html',
  styleUrls: ['./registration-step1.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule, ValidatorMessageComponent]
})
export class RegistrationStep1Page implements OnInit {
  registrationStep1Form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registrationService: RegistrationService
  ) {
    this.registrationStep1Form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onNext() {
    if (this.registrationStep1Form.valid) {
      const step1Data: RegistrationStep1 = this.registrationStep1Form.value;
      this.registrationService.setStep1Data(step1Data);

      this.router.navigate(['/registration-step2']);
    }
  }
}
