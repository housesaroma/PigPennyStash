// interfaces/event.interface.ts
import { UserContacts } from "../services/contacts/contacts.service";

export interface IEvent {
  id: string;
  title: string;
  totalAmount: number;
  deadline: string;
  creator: {
    id: string;
    email: string;
    name: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
  };
  members: IEventMember[];
  createdAt: string;
  status: string;
}

export interface IEventMember {
  id: string;
  eventId: string;
  userId: string;
  amount: number;
  user: UserContacts;
}

export interface IEventCreate {
  title: string;
  totalAmount: number;
  deadline: string;
  members?: IEventMemberAdd[];
}

export interface IEventMemberAdd {
  userId: string;
  amount: number;
}
