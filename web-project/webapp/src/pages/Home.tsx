import { useAuth } from "../hooks/useAuth";

export function Home() {

    const {user} = useAuth();

    return(
        <div id="page-home">
            Seja bem vindo, {user?.name}
        </div>
    )
}