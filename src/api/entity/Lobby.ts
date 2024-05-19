export interface Lobby {
    _id: string;
    name: string;
    password: string;
    havePassword: boolean;
    creator: string;
    opponent: string;
    createdAt: Date;
}