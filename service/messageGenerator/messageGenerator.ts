export function messageGenerator(message: string) {
    interface ResponseMessage {
        message: string;
    }
    return { message } as ResponseMessage;
}
