import { Contact } from "./contact.interface";

export interface Event {
  id : number,
  title : string,
  members: Contact[],
  totalAmount: number | null,
}
