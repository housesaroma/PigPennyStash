import { Contact } from "../models/contact.model";

export interface IEvent {
  id : number,
  title : string,
  members: Contact[],
  deadline: Date | null,
  totalAmount: number | null,
}
