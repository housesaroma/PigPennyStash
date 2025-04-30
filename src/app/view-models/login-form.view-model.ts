import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginFormInterface} from "../interfaces/login.form.interface";

export class LoginFormViewModel {
  public get controlMap(): LoginFormInterface {
    return this._form.controls;
  }

  public get form(): FormGroup<LoginFormInterface> {
    return this._form;
  }

  private _form!: FormGroup<LoginFormInterface>;

  constructor() {
    this.setForm();
  }

  protected getControls(): LoginFormInterface {
    return {
      userEmail: new FormControl('', {validators: [Validators.required, Validators.email], nonNullable: true}),
      userPassword: new FormControl('', {validators: Validators.required, nonNullable: true})
    };
  }

  private setForm(): void {
    this._form = new FormGroup<LoginFormInterface>(this.getControls());
  }
} 