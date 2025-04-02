import { Contact } from "../models/contact.model";

export interface Event {
  id : number,
  title : string,
  members: Contact[],
  totalAmount: number | null,
}
