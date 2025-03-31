import {FormControl} from "@angular/forms";

export interface RegisterFormInterface {
  userName : FormControl<string>,
  userSurname: FormControl<string>,
  userEmail: FormControl<string>,
  userPassword: FormControl<string>,
  userAddress: FormControl<string>,
  userPhone: FormControl<string>,
}
