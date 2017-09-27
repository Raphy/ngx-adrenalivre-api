import { Session } from './session';

export class CredentialsSession extends Session {
    mode: string = 'credentials';

    emailAddress: string;

    plainPassword: string;

    remembered: boolean;

    toForm(): object {
        let form: any = super.toForm();

        form.emailAddress = this.emailAddress;
        form.plainPassword = this.plainPassword;
        form.remembered = this.remembered;

        return form;
    }
}
