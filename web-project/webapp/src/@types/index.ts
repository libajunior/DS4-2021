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
    id?: number;
    name: string;
    owner: User;
    description: string;
}

export type StatusColumn = {
    id?: number;
    name: string;
    color: string;
}

export type Task = {
    id?: number;
    statusColumn: StatusColumn;
    title: string;
    description: string;
    owner: User;
    priority: number;
    percentage: number;
    startDate: Date;
    endDate: Date;
}