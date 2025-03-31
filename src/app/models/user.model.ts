export class UserModel {
  public name: string;
  public surname: string;
  public email: string;
  public password: string;
  public address: string;
  public phone: string;

  constructor(data: IUserData) {
    this.name = data.name;
    this.surname = data.surname;
    this.email = data.email;
    this.password = data.password;
    this.address = data.address;
    this.phone = data.phone;
  }
}

export interface IUserData {
  name: string;
  surname: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}
