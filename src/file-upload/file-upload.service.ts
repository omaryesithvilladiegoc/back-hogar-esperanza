import { Injectable } from '@nestjs/common';
import { FileUploadDto } from './dto/create-file-upload.dto';

@Injectable()
export class FileUploadService {
  create(createFileUploadDto: FileUploadDto) {
    return 'This action adds a new fileUpload';
  }

  findAll() {
    return `This action returns all fileUpload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fileUpload`;
  }

  remove(id: number) {
    return `This action removes a #${id} fileUpload`;
  }
}
