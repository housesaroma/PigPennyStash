export class Contact {
    name: string;
    events: string[];
    avatar: string;
    ownContribution: number | 0;

    constructor(data: IContactData) {
        this.name = data.name,
        this.events = data.events,
        this.avatar = data.avatar,
        this.ownContribution = data.ownContribution
    }
}

export interface IContactData {
    name: string;
    events: string[];
    avatar: string;
    ownContribution: number | 0,
}