import { LobbyUserStatus } from "../entity/LobbyUser"

export interface CreateLobbyUserDto {
    user: string;
    status: LobbyUserStatus;
}