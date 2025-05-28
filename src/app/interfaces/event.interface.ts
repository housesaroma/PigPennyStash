import { Contact } from "../models/contact.model";
import {UserContacts} from "../services/contacts/contacts.service";

export interface IEvent {
  id : number,
  title : string,
  members: UserContacts[],
  deadline: Date | null,
  totalAmount: number | null,
}
