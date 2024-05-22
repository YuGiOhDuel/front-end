import { ApiAdapterInterface } from "./ApiAdapter";
import { User } from "../entity/User";

export class UserAdapter {
    public constructor(
        private readonly adapter: ApiAdapterInterface
    ) {
        this.adapter = adapter;
    }

    public async get(id: string): Promise<User> {
        return await this.adapter.fetch(
            `/user/${id}`
        );
    }
}