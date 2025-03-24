import {Injectable} from '@angular/core';
import {RegistrationData, RegistrationStep1, RegistrationStep2, RegistrationStep3} from '../../interfaces/registration.interface';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private registrationData: RegistrationData = {};

  setStep1Data(data: RegistrationStep1) {
    this.registrationData.step1 = data;
  }

  setStep2Data(data: RegistrationStep2) {
    this.registrationData.step2 = data;
  }

  setStep3Data(data: RegistrationStep3) {
    this.registrationData.step3 = data;
  }

  getRegistrationData(): RegistrationData {
    return this.registrationData;
  }

  clearRegistrationData() {
    this.registrationData = {};
  }
}
