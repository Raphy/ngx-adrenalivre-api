import { Session } from './session';

export class CredentialsSession extends Session {
    public mode: string = 'credentials';
    public emailAddress: string;
    public plainPassword: string;
    public remembered: boolean;
}
