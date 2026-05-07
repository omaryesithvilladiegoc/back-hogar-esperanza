import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMailInput } from './dto/create-send-mail.dto';
import { EMAIL_FROM } from 'src/helpers/enviroment';

@Injectable()
export class SendMailsService {
  constructor(private readonly mailService: MailerService) {}

  sendMail = async (messageObject: SendMailInput) => {
    const { to, subject, text, html } = messageObject;
    try {
      const response = await this.mailService.sendMail({
        from: EMAIL_FROM,
        to,
        subject,
        text,
        html,
      });
      if (!response)
        throw new BadRequestException('Hubo un error al enviar el mensaje');
      console.log(response);

      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new BadRequestException(`Error SMTP: ${message}`);
    }
  };
}
