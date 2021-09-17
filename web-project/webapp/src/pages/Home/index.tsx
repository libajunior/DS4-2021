import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/useAuth";

export function Home() {

    const { user } = useAuth();

    return(
        <div id="page-home">
            <Header />
        </div>
    )
}