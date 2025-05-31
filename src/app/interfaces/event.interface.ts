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
  members: {
    id: string;
    eventId: string;
    userId: string;
    amount: number;
    user: {
      id: string;
      email: string;
      name: string;
      phone: string;
      createdAt: string;
      updatedAt: string;
    };
  }[];
  createdAt: string;
  status: string;
}

export interface IEventCreate {
  title: string;
  totalAmount: number;
  deadline: string;
  members?: {
    userId: string;
    amount: number;
  }[];
}

export interface IEventMemberAdd {
  userId: string;
  amount: number;
}
