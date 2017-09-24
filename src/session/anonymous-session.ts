import { Session } from './session';

export class AnonymousSession extends Session {
    public mode: string = 'anonymous';
}
