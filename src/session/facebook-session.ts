import { Session } from './session';

export class FacebookSession extends Session {
    mode: string = 'facebook';

    authorizationCode: string;

    toForm(): object {
        let form: any = super.toForm();

        form.authorizationCode = this.authorizationCode;

        return form;
    }
}
