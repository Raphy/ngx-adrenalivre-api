import { Session } from './session';

export class FacebookSession extends Session {
    public mode: string = 'facebook';
    public authorizationCode: string;
}
