
export class AppException {
    public readonly code: number;
    public readonly message: string;

    constructor(message: string, code: number = 500) {
        this.code = code;
        this.message = message;
    }
}