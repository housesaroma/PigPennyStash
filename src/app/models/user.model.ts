export class UserModel {
  public name: string;
  public surname: string;
  public email: string;
  public password: string;
  public phone: string;

  constructor(data: IUserData) {
    this.name = data.name;
    this.surname = data.surname;
    this.email = data.email;
    this.password = data.password;
    this.phone = data.phone;
  }
}

export interface IUserData {
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
}
