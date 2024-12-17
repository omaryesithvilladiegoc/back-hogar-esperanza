import { Injectable } from '@nestjs/common';
import { CreateSendMailDto } from './dto/create-send-mail.dto';
import { UpdateSendMailDto } from './dto/update-send-mail.dto';

@Injectable()
export class SendMailsService {
  create(createSendMailDto: CreateSendMailDto) {
    return 'This action adds a new sendMail';
  }

  findAll() {
    return `This action returns all sendMails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sendMail`;
  }

  update(id: number, updateSendMailDto: UpdateSendMailDto) {
    return `This action updates a #${id} sendMail`;
  }

  remove(id: number) {
    return `This action removes a #${id} sendMail`;
  }
}
