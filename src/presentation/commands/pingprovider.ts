import { singleton } from "tsyringe";

@singleton()
export class PingProvider {

    respond(message: string) {
        return `This was your message: ${message} Pong!`;
    }
}