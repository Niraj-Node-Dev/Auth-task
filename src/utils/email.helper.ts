import * as nodemailer from 'nodemailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from 'entities';
import { MAIL_PASSWORD, MAIL_USERNAME, VERIFY_EMAIL_URL } from 'config';

@Injectable()
export class EmailHelper {
    constructor() { }

    public async sendVerificationMail(user: Users) {
        const verificationUrl = `${VERIFY_EMAIL_URL}/api/v1/auth/verify-email?token=${user.verification_token}`;

        const templateHTML = `<p>Please click the following link to verify your email address:</p>
               <a href="${verificationUrl}">${verificationUrl}</a>`


        return await this.emailSender(
            user.first_name || (user.email?.match(/^([^@]*)@/) || [])[1],
            `Verification mail!`,
            templateHTML,
            user.email
        );
    }

    private async emailSender(username: string, subject: string, mailBody: any, mail: string) {
        try {
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: MAIL_USERNAME,
                    pass: MAIL_PASSWORD,
                },
            });

            return await transporter.sendMail({
                from: `${username} <info@test.app>`,
                to: mail,
                subject: subject,
                html: mailBody,
            });
        } catch (e) {
            throw new BadRequestException(e, `email error ${subject}`);
        }
    }
}
