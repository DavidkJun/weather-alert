import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigSetupService } from '../config/config.service';

@Injectable()
export class MailerService {
    private transporter;

    constructor(private readonly configService: ConfigSetupService) {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: configService.get('SMTP_USER'),
                pass: configService.get('SMTP_PASS'),
            },
        });
    }

    async sendEmail(to: string, subject: string, text: string) {
        return this.transporter.sendMail({
            from: this.configService.get('SMTP_USER'),
            to,
            subject,
            text,
        });
    }
}
