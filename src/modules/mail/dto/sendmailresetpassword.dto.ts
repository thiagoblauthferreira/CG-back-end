export class SendMailResetPasswordDto {
    name: string;
    password: string;
    mail: string

    constructor(name: string, password: string, mail: string) {
        this.name = name;
        this.password = password;
        this.mail = mail;
    }
}
