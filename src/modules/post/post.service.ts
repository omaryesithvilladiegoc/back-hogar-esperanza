import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const { title, subtitle, footer, mainContent, header, idUser,keywords ,size} =
      createPostDto;
    try {
      const userFound:User = await this.userRepository.findOneBy({ id: idUser });
      if (!userFound) throw new BadRequestException('No hay usuario admin');
      const postCreated:Post = this.postRepository.create({
        title,
        subtitle,
        footer,
        mainContent,
        header,
        keywords,
        user:userFound,
        size
      });

      return await this.postRepository.save(postCreated)
    } catch (error) {
      throw error;
    }
    return 'working...';
  }

  async findAll() {
    try {
      const posts = await this.postRepository.find({
        order: {
          createdAt: 'ASC', // Ordena por el campo createdAt en orden descendente
        },
      });
      
      if (!posts) {
        throw new BadRequestException('Hubo un error al obtener los posts o no hay posts disponibles');
      }
  
      return posts.reverse();
    } catch (error) {
      throw error; // Re-lanza el error para que lo maneje un middleware de excepciones si existe
    }
  }
  

  async findOne(id: string) {

    try {
      const postFound:Post = await this.postRepository.findOneBy({id})
      if(!postFound) throw new BadRequestException('Hubo un error al obtener el post')
      return postFound
    } catch (error) {
      throw error
    }
  }

  async getPostById(id:string):Promise<Post> {

    try {
      const postFound = await this.postRepository.findOneBy({id})
      if(!postFound) throw new BadRequestException('HUbo un error al encontrar el post')
      return postFound
    } catch (error) {
      throw error.message
    }

  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  async remove(id: string) {
   try {
    const response = await this.postRepository.delete({id})
    if(!response) throw new BadRequestException('HUbo un error al eliminar el post')
    return response
   } catch (error) {
    throw error
   }
  }

  async updateSize(size:number,idPost:string) {
    try {

      if(size > 12 || size < 1) {
        throw new BadRequestException('Las medidas son precisas')
      }

      const postFound = await this.postRepository.findOneBy({id:idPost})
      if(!postFound) throw new BadRequestException('No existe el post')

      const postUpdated = await this.postRepository.update({id:idPost},{size})
      if(!postUpdated) throw new BadRequestException('Hubo un error actualizando el post')
      return `el size del post con id ${postFound.id} se actualizo con exito`
    } catch (error) {
        throw error
    }
  }
}
