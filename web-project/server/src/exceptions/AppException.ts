
export class AppException {
    public readonly code: number;
    public readonly name: string;
    public readonly message: string;

    constructor(message: string, name: string, code: number = 500) {
        this.code = code;
        this.name = name;
        this.message = message;
    }
}