import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';
import { Post } from 'src/modules/post/entities/post.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID único del comentario', example: 'a3c5b1f1-d9e2-4d82-b04f-2b31ed56b25b' })
  id: string;

  @Column('text')
  @ApiProperty({ description: 'Contenido del comentario', example: 'Este es un excelente artículo sobre el cuidado de los abuelos.' })
  content: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'Fecha en que se realizó el comentario', example: '2024-12-16T12:30:00Z' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
}
