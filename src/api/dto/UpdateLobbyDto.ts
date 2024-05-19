import { CreateLobbyDto } from "./CreateLobbyDto";

export interface UpdateLobbyDto extends Partial<CreateLobbyDto> {
    opponent?: string;
}