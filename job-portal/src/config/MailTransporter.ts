import * as nodemailer from "nodemailer";

export class MailTransporter {
    static instance: MailTransporter;
    private _transporter: nodemailer.Transporter;

    private constructor() {}

    public async init() {
        this._transporter = nodemailer.createTransport({
            host: "Gmail",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        await this.verifyConnection();
    }

    private verifyConnection() {
        this._transporter.verify((error, success) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Mail Transporter is ready to send emails");
            }
        });
    }

    public async sendEMail(to: string, subject: string, html: string) {
        // this._transporter.sendMail({
        //     from: process.env.EMAIL,
        //     to,
        //     subject,
        //     html,
        // });
    }

    public static getInstance(): MailTransporter {
        if (!MailTransporter.instance) {
            MailTransporter.instance = new MailTransporter();
        }
        return MailTransporter.instance;
    }
}
