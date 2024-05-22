"use client"
import { ApiAdapter } from "@/api/adapter/ApiAdapter";
import { LobbyAdapter } from "@/api/adapter/LobbyAdapter";
import { UserAdapter } from "@/api/adapter/UserAdapter";
import { useParams } from "next/navigation";
import { Lobby } from "@/api/entity/Lobby";
import { User } from "@/api/entity/User";
import { useEffect, useState } from "react";

export default function LobbyPage() {
    const { lobbyId } = useParams() as { lobbyId: string };
    const [lobby, setLobby] = useState<Lobby>();
    const [creator, setCreator] = useState<User>();
    const [opponent, setOpponent] = useState<User>();
    const adapter = new ApiAdapter();

    const setUser = async (id: string, setter: (user: User)=>void) => {
        const userAdapter = new UserAdapter(adapter);
        const user = await userAdapter.get(id);
        setter(user);
    }

    const getLobby = async () => {
        const lobbyAdapter = new LobbyAdapter(adapter);
        const lobby = await lobbyAdapter.get(lobbyId);
        console.log(lobby);
        if (lobby.creator) {
            setUser(lobby.creator, setCreator);
        }
        if (lobby.opponent) {
            setUser(lobby.opponent, setOpponent);
        }
        setLobby(lobby);
    }

    useEffect(() => {
        const timer = setTimeout(
            getLobby,
            3000
        );
        return () => clearTimeout(timer);
    }, [lobby]);


    return (
        <section style={{ float: "left", width: "100%" }}>
            <h1 style={{ float: "left", textAlign: "center", width: "100%" }}>
                Name: {lobby?.name}
            </h1>
            <h2 style={{ float: "left", textAlign: "center", width: "100%" }}>
                Password: {lobby?.password}
            </h2>
            <div style={{ float: "left", width: "50%" }}>
                <p>Username: {creator?.username}</p>
            </div>
            <div style={{ float: "left", width: "50%" }}>
                <p>Username: {opponent ? opponent.username : "Waitting"}</p>
            </div>
        </section>
    );
}