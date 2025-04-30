import {FormControl} from "@angular/forms";

export interface LoginFormInterface {
  userEmail: FormControl<string>,
  userPassword: FormControl<string>
} 