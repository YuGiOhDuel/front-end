import { SignInResponseDto } from "../dto/SignInResponseDto";
import { SignUpResponseDto } from "../dto/SignUpResponseDto";
import { SignInRequestDto } from "../dto/SignInRequestDto";
import { SignUpRequestDto } from "../dto/SignUpRequestDto";
import { ApiAdapterInterface } from "./ApiAdapter";

export class AuthAdapter {
    public constructor(
        private readonly adapter: ApiAdapterInterface
    ) {
        this.adapter = adapter;
    }

    public async signIn(input: SignInRequestDto): Promise<SignInResponseDto> {
        const data = await this.adapter.fetch<SignInResponseDto>(
            "/auth/signIn",
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(input)
            }
        );
        return data;
    }

    public async signUp(input: SignUpRequestDto): Promise<SignUpResponseDto> {
        const data = await this.adapter.fetch<SignUpResponseDto>(
            "/auth/signUp",
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(input)
            }
        );
        return data;
    }
}
