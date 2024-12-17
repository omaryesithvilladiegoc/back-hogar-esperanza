import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/modules/post/entities/post.entity';
import { v4 as uuid } from 'uuid';
import { Like } from 'src/modules/likes/entities/like.entity';
import { Donation } from 'src/modules/donations/entities/donation.entity';
import { Comment } from 'src/modules/comments/entities/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID único del usuario', example: 'b4e4c2ee-ef54-4d72-8f8e-6e54d1b0e8c1' })
  id: string = uuid();

  @Column({ unique: true })
  @ApiProperty({ description: 'Correo electrónico del usuario', example: 'admin@fundacion.com' })
  email: string;

  @Column()
  @ApiProperty({ description: 'Contraseña del usuario', example: 'password123' })
  password: string;

  @Column({ default: true })
  @ApiProperty({ description: 'Es administrador o no' })
  isAdmin: boolean;

  @Column()
  @ApiProperty({ description: 'Nombre del usuario', example: 'Juan Pérez' })
  name: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Donation, (donation) => donation.user)
  @ApiProperty({ description: 'Lista de donaciones realizadas por el usuario' })
  donations: Donation[];
}
