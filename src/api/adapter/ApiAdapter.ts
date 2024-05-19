export interface ApiAdapterInterface {
    fetch<T>(uri: string, headers?: RequestInit): Promise<T>
}

export class ApiAdapter implements ApiAdapterInterface {
    private readonly url: string;
    public constructor() {
        this.url = "http://localhost:4004";
    }

    public async fetch<T>(uri: string, init: RequestInit = {  }): Promise<T> {
        const req = await Promise.resolve(
            fetch(
                `${this.url}${uri}`,
                init
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