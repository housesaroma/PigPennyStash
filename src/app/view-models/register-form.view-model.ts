import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterFormInterface} from "../interfaces/register.form.interface";
import {IUserData, UserModel} from "../models/user.model";

export class RegisterFormViewModel {

  public get controlMap(): RegisterFormInterface{
    return this._form.controls;
  }

  public get form(): FormGroup<RegisterFormInterface>{
    return this._form;
  }

  private _form!: FormGroup<RegisterFormInterface>;

  constructor(private _modelFactory: () => IUserData){
    this.setForm();
  }

  public updateModel(model: IUserData): void {
    model.name = this.controlMap.userName.value;
    model.surname = this.controlMap.userSurname.value;
    model.password = this.controlMap.userPassword.value;
    model.email = this.controlMap.userEmail.value;
    model.address = this.controlMap.userAddress.value;
    model.phone = this.controlMap.userPhone.value;
  }

  public toModel(): UserModel{
    const model: IUserData = this._modelFactory();
    this.updateModel(model);

    return model;
  }

  public fromModel(model: UserModel): void {
    this.controlMap.userName.setValue(model.name, {onlySelf: true, emitEvent: false});
    this.controlMap.userSurname.setValue(model.surname, {onlySelf: true, emitEvent: false});
    this.controlMap.userPassword.setValue(model.password, {onlySelf: true, emitEvent: false});
    this.controlMap.userEmail.setValue(model.email, {onlySelf: true, emitEvent: false});
    this.controlMap.userAddress.setValue(model.address, {onlySelf: true, emitEvent: false});
    this.controlMap.userPhone.setValue(model.phone, {onlySelf: true, emitEvent: false});
  }

  protected getControls(): RegisterFormInterface{
    return {
      userName: new FormControl('', {validators: Validators.required, nonNullable: true}),
      userSurname: new FormControl('', {validators: Validators.required, nonNullable: true}),
      userPassword: new FormControl(),
      userEmail: new FormControl('', {validators: [Validators.required, Validators.email], nonNullable: true}),
      userAddress: new FormControl('', {validators: Validators.required, nonNullable: true}),
      userPhone: new FormControl('', {validators: Validators.required, nonNullable: true}),
    };
  }

  private setForm(): void {
    this._form = new FormGroup<RegisterFormInterface>(this.getControls())
  }
}
