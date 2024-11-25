import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { FileUploadDto } from './dto/create-file-upload.dto';
import { UploadApiResponse, v2 as cloudinary} from "cloudinary";
import toStream = require('buffer-to-stream')
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {

  constructor(@InjectRepository(Post) private postRepository: Repository<Post>){}
 
  uploadImage = async (file:Express.Multer.File):Promise<UploadApiResponse> => {
    return new Promise((resolve,reject) => {
        const upload = cloudinary.uploader.upload_stream({
            resource_type:'auto'
        },(error,result) => error? reject(error): resolve(result)) 
        toStream(file.buffer).pipe(upload)
    })
    



}



uploadImageFetch = async  (file:Express.Multer.File, postId:string) => {

  const postFound = await this.postRepository.findOneBy({id:postId})
  if(!postFound) throw new BadRequestException('No existe el post que quiere adctualizar')
  const fileUrl = (await this.uploadImage(file)).secure_url

  const updatedPost = this.postRepository.update({id:postFound.id},{image:fileUrl})
  if(!updatedPost) throw new BadGatewayException('Hubo un error al actualizar el post')
  
  return `La imagen del producto con id ${postId} se actualizo con exito`
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
