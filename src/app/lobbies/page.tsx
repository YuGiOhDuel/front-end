"use client"
import { LobbyAdapter } from "@/api/adapter/LobbyAdapter";
import { ApiAdapter } from "@/api/adapter/ApiAdapter";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LobbyUserAdapter } from "@/api/adapter/LobbyUserAdapter";
import { LobbyUserStatus } from "@/api/entity/LobbyUser";

interface LobbyData {
    name: string;
    password?: string;
}

export default function LobbiesPage() {
    const [popupState, setPopupState] = useState<boolean>(false);
    const [formsData, setFormsData] = useState<LobbyData>({ name: "" });
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        console.log(session)
        if (session === null) {
            router.push("/auth/signin");
        }
    }, [session]);

    const buttonClickHandler = () => setPopupState(!popupState);
    const formsDataChangeHandler = (key: keyof LobbyData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormsData({
            ...formsData,
            [key]: event.target.value
        });
    }

    const createLobbyButtonClickHandler = async () => {
        if (formsData.name && session) {
            const apiAdapter = new ApiAdapter();
            const lobbyAdapter = new LobbyAdapter(apiAdapter);
            const lobbyUser = new LobbyUserAdapter(apiAdapter);
            const user = await lobbyUser.create({
                user: session.user._id,
                status: LobbyUserStatus.WAITTING
            });
            const data = await lobbyAdapter.create({
                ...formsData,
                creator: user._id
            });
            router.push(`/lobbies/${data._id}`);
        }
    }
    return (
        <section>
            {
                session?.user && <>
                    <button onClick={buttonClickHandler}>
                        Create Lobby
                    </button>
                    <div style={{
                        boxShadow: popupState ? "10px 10px 8px 10px #888888" : undefined,
                        height: popupState ? "180px" : 0,
                        margin: "0 auto",
                        textAlign: "center",
                        transition: ".5s",
                        width: "400px"
                    }}>
                        {
                            popupState && <>
                                <h3 style={{ float: "left", marginTop: "10px", width: "100%" }}>Create Lobby</h3>
                                <input
                                    id="name"
                                    onChange={formsDataChangeHandler('name')}
                                    placeholder="name"
                                    style={{ margin: "5%", marginTop: "5px", marginBottom: "5px", width: "90%" }}
                                    type="text"
                                />
                                <input
                                    id="password"
                                    onChange={formsDataChangeHandler('password')}
                                    placeholder="password"
                                    style={{ margin: "5%", marginTop: "5px", marginBottom: "5px", width: "90%" }}
                                    type="password"
                                />
                                <button
                                    onClick={createLobbyButtonClickHandler}
                                    style={{ cursor: "pointer", marginTop: "5px" }}
                                >
                                    Create
                                </button>
                                <br/>
                                <button
                                    onClick={() => setPopupState(false)}
                                    style={{ cursor: "pointer", marginTop: "10px" }}
                                >
                                    Quit
                                </button>
                            </>
                        }
                    </div>
                
                </>
            }
        </section>
    );
}