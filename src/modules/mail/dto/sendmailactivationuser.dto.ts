export class SendMailActivationUserDto {
    name: string;
    mail: string;
    code: string;

    constructor(name: string, mail: string, code: string) {
        this.name = name;
        this.mail = mail;
        this.code = code;
    }
}
