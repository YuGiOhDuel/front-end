import { Headers } from "../types/Headers";
import { RequestError } from "../types/RequestError";

export interface ApiAdapterInterface {

}

export class ApiAdapter implements ApiAdapterInterface {
    private readonly url: string;
    public constructor() {
        this.url = "http://localhost:4004";
    }

    public async get<T>(uri: string, headers: Headers = {  }): Promise<T> {
        const req = await Promise.resolve(
            fetch(
                `${this.url}${uri}`,
                { headers: headers }
            )
        );
        if (!req.ok) {
            throw new Error(`Request Error: ${req.text}`);
        }
        const data = await req.json();
        if (data?.message && data?.statusCode) {
            throw new Error(`Request Error: ${data?.message}`);
        }
        return data;
    }
}