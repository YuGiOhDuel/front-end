export enum LobbyUserStatus {
    READY = "Ready",
    WAITTING = "Waitting"
}

export interface LobbyUser {
    _id: string;
    user: string;
    status: LobbyUserStatus;
}