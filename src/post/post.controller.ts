import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/auth/enums/roles.enum';
import { Role } from 'src/auth/decorators/role.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserIdInterceptor } from './interceptors/userId.interceptor';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}


  @ApiBearerAuth()
  @Role(Roles.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    
    try {
      return await this.postService.create(createPostDto);
    
    } catch (error) {
      throw error
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.postService.findAll();

    } catch (error) {
      throw error
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.postService.findOne(id);
    } catch (error) {
      throw error
    }
  }

  @Patch('/update-size/:id')
  @ApiBearerAuth()
  @Role(Roles.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  async updateSizePost(@Param('id') id: string, @Body() UpdatePostDto: UpdatePostDto) {
    const {size} = UpdatePostDto
    try {
      const response = await this.postService.updateSize(size,id)
      return response
    } catch (error) {
      throw error
    }
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
