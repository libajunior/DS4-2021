import { useAuth } from "../hooks/useAuth"
import { AppRoutes } from "./AppRoutes"
import { AuthRoutes } from "./AuthRoutes"


export function Routes() {

    const { signed } = useAuth();
    return (
        signed ? <AppRoutes /> : <AuthRoutes />
    )
}