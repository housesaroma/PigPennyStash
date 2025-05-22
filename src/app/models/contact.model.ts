export class Contact {
    id: string;
    name: string;
    events: string[];
    avatar: string;
    ownContribution: number | 0;

    constructor(data: IContactData) {
        this.id = data.id,
        this.name = data.name,
        this.events = data.events,
        this.avatar = data.avatar,
        this.ownContribution = data.ownContribution
    }
}

export interface IContactData {
    id: string;
    name: string;
    events: string[];
    avatar: string;
    ownContribution: number | 0,
}