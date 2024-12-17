import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';
import { Post } from 'src/modules/post/entities/post.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID único del like', example: 'd9b5d1f3-c09e-4f5a-b8f9-d4fb8bdb7c85' })
  id: string;

  @ManyToOne(() => User, (user) => user.likes)
  @ApiProperty({ description: 'Usuario que dio el like' })
  user: User;

  @ManyToOne(() => Post, (post) => post.likes)
  @ApiProperty({ description: 'Post que recibió el like' })
  post: Post;
}
