import { Session } from './session';

export class GoogleSession extends Session {
    public mode: string = 'facebook';
    public authorizationCode: string;
}
