import { Session } from "./session";
import { Form } from "../form";

export class SessionForm extends Form<Session> {
    mode: string;

    emailAddress: string;

    plainPassword: string;

    authorizationCode: string;

    remembered: boolean;

    populate(item: Session) {
    }
}