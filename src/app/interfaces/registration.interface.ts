export interface RegistrationStep1 {
  name: string;
  surname: string;
}

export interface RegistrationStep2 {
  email: string;
  password: string;
}

export interface RegistrationStep3 {
  phone: string;
}

export interface RegistrationData {
  step1?: RegistrationStep1;
  step2?: RegistrationStep2;
  step3?: RegistrationStep3;
}
