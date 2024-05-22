import { GetLobbyUserDto } from "../dto/GetLobbyUserDto";
import { ApiAdapterInterface } from "./ApiAdapter";
import { LobbyUser } from "../entity/LobbyUser";
import { CreateLobbyUserDto } from "../dto/CreateLobbyUserDto";

export class LobbyUserAdapter {
    public constructor(
        private readonly adapter: ApiAdapterInterface
    ) {
        this.adapter = adapter;
    }

    public async getAll(): Promise<GetLobbyUserDto> {
        return await this.adapter.fetch("/lobby-user");
    }

    public async get(id: string): Promise<LobbyUser> {
        return await this.adapter.fetch(`/lobby-user/${id}`);
    }

    public async create(input: CreateLobbyUserDto): Promise<LobbyUser> {
        return await this.adapter.fetch(
            "/lobby-user",
            {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(input)
            }
        );
    }

    public async update(id: string, input: Partial<CreateLobbyUserDto>): Promise<LobbyUser> {
        return await this.adapter.fetch(
            `/lobby-user/${id}`,
            {
                method: 'PATCH',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(input)
            }
        );
    }

    public async remove(id: string): Promise<LobbyUser> {
        return await this.adapter.fetch(
            `/lobby-user/${id}`,
            { method: 'DELETE' }
        );
    }
}