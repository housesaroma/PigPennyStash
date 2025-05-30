export class Contact {
    id: string;
    name: string;
    events: string[];
    avatar: string;
    ownContribution: number | 0;
    email?: string;
    phone?: string;
    createdAt?: string;
    status?: string;
    isOwner?: boolean;
    otherUserId?: string;

    constructor(data: IContactData) {
        this.id = data.id,
        this.name = data.name,
        this.events = data.events,
        this.avatar = data.avatar,
        this.ownContribution = data.ownContribution,
        this.email = data.email,
        this.phone = data.phone,
        this.createdAt = data.createdAt,
        this.status = data.status,
        this.isOwner = data.isOwner,
        this.otherUserId = data.otherUserId
    }
}

export interface IContactData {
    id: string;
    name: string;
    events: string[];
    avatar: string;
    ownContribution: number | 0,
    email?: string;
    phone?: string;
    createdAt?: string;
    status?: string;
    isOwner?: boolean;
    otherUserId?: string;
}
