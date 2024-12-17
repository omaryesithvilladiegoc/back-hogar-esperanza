import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SendMailsService } from './send-mails.service';
import { CreateSendMailDto } from './dto/create-send-mail.dto';
import { UpdateSendMailDto } from './dto/update-send-mail.dto';

@Controller('send-mails')
export class SendMailsController {
  constructor(private readonly sendMailsService: SendMailsService) {}

  @Post()
  create(@Body() createSendMailDto: CreateSendMailDto) {
    return this.sendMailsService.create(createSendMailDto);
  }

  @Get()
  findAll() {
    return this.sendMailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sendMailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSendMailDto: UpdateSendMailDto) {
    return this.sendMailsService.update(+id, updateSendMailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sendMailsService.remove(+id);
  }
}
