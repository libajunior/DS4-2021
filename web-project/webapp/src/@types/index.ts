export type User = {
    id: number;
    name: string;
    email: string;
    avatar: string;
}

export type CredentialType = {
    username: string;
    password: string;
}

export type Project = {
    id: number;
    name: string;
    owner: User;
    description: string;
}

