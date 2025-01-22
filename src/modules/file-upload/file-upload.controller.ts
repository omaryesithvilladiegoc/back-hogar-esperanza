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
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadDto } from './dto/create-file-upload.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Role } from 'src/modules/auth/decorators/role.decorator';
import { Roles } from 'src/modules/auth/enums/roles.enum';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';

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

  @Post('/uploadExtraImages/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload multiple images',
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiBearerAuth()
  @Role(Roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FilesInterceptor('files', 10)) // Limita a 10 imágenes simultáneas
  async uploadExtraImages(
    @Param('id', ParseUUIDPipe) idProduct: string,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 2000000, // 2MB por archivo
            message: 'One of the files is too large',
          }),
          new FileTypeValidator({
            fileType: /gif|jpg|png|jpeg|webp|svg/,
          }),
        ],
      }),
    )
    files: Array<Express.Multer.File>,
  ) {
    try {
      if (!files || files.length === 0) {
        throw new BadRequestException('No files uploaded');
      }

     
      
        const response = await this.fileUploadService.uploadImagesFetch(files, idProduct);
      

      return { msg: 'Files uploaded successfully', response };
    } catch (error) {
      console.log(error);
      
      throw error;
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
