import { CreateLobbyDto } from "../dto/CreateLobbyDto";
import { UpdateLobbyDto } from "../dto/UpdateLobbyDto";
import { ApiAdapterInterface } from "./ApiAdapter";
import { GetLobbyDto } from "../dto/GetLobbyDto";
import { Lobby } from "../entity/Lobby";

export class LobbyAdapter {
    public constructor(
        private readonly adapter: ApiAdapterInterface
    ) {
        this.adapter = adapter;
    }

    public async getAll(): Promise<GetLobbyDto> {
        return await this.adapter.fetch("/lobby");
    }

    public async get(id: string): Promise<Lobby> {
        return await this.adapter.fetch(`/lobby/${id}`);
    }

    public async create(input: CreateLobbyDto): Promise<Lobby> {
        return await this.adapter.fetch(
            "/lobby",
            {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(input)
            }
        );
    }

    public async update(id: string, input: UpdateLobbyDto): Promise<Lobby> {
        return await this.adapter.fetch(
            `/lobby/${id}`,
            {
                method: 'PATCH',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(input)
            }
        );
    }

    public async remove(id: string): Promise<Lobby> {
        return await this.adapter.fetch(
            `/lobby/${id}`,
            { method: 'DELETE' }
        );
    }
}