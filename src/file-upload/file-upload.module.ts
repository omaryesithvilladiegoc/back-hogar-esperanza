import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Post])],
  controllers: [FileUploadController],
  providers: [FileUploadService, CloudinaryConfig],
})
export class FileUploadModule {}
