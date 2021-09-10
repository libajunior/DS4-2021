import { AxiosResponse } from "axios";
import { createContext, ReactNode, useState } from "react";
import serverAPI from "../services/serverAPI";

type AuthContextType = {
    user: User | undefined;
    signIn(credential: CredentialType): Promise<AxiosResponse>;
    setUser(user: User): void;
}

type CredentialType = {
    username: string;
    password: string;
}

export type User = {
    id: number;
    name: string;
    email: string;
    avatar: string;
}

type AuthContextProviderProps = {
    children: ReactNode;
} 

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {

    const [user, setUser] = useState<User>();


    function signIn(credential: CredentialType) {
        return serverAPI.post('/auth/signin', credential);
    }

    return (
        <AuthContext.Provider value={{user, signIn, setUser}}>
            {props.children}
        </AuthContext.Provider>
    )

}