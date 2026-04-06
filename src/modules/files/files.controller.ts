import { Controller, Get, Param } from '@nestjs/common';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get(':folder')
  getImages(@Param('folder') folder: string) {
    return this.filesService.getImagesByFolder(folder);
  }
}
