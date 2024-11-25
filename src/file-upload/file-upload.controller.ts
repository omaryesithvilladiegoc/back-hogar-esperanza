import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadDto } from './dto/create-file-upload.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from 'src/auth/decorators/role.decorator';
import { Roles } from 'src/auth/enums/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('/uploadImage/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload file',
    type: FileUploadDto,
  })
  @ApiBearerAuth()
  @Role(Roles.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id', ParseUUIDPipe) idProduct: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 2000000,
            message: 'File is to large',
          }),
          new FileTypeValidator({
            fileType: /gif|jpg|png|jpeg|webp|svg/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      console.log(file);
      const response = await this.fileUploadService.uploadImageFetch(file, idProduct);
      return  {msg:response}

    } catch (error) {
      throw error
    }
  }

  @Get()
  findAll() {
    return this.fileUploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileUploadService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileUploadService.remove(+id);
  }
}
