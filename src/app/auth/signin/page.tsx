"use client"
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

interface SignInForms {
    username: string;
    password: string;
}

export default function SignInPage() {
    const [formsData, setFormsData] = useState<SignInForms>({
        username: "",
        password: ""
    });
    const router = useRouter();

    const changeFormsDataHandler = (key: keyof SignInForms) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormsData({
            ...formsData,
            [key]: event.target.value
        });
    }

    const buttonClickHandler = async () => {
        const response = await signIn(
            'credentials',
            { ...formsData, redirect: false }
        );
        if (!response?.ok) {
            console.log(response?.error);
            return;
        }
        router.push("/");
    }
    
    return (
        <section>
            <input
                id="username"
                onChange={changeFormsDataHandler("username")}
                placeholder="username"
                type="text"
            />
            <input
                id="password"
                onChange={changeFormsDataHandler("password")}
                placeholder="password"
                type="password"
            />
            <button onClick={buttonClickHandler}>
                Logar
            </button>
        </section>
    );
} 