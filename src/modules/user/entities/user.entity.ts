import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/modules/post/entities/post.entity';
import { v4 as uuid } from 'uuid';
import { Like } from 'src/modules/likes/entities/like.entity';
import { Donation } from 'src/modules/donations/entities/donation.entity';
import { Comment } from 'src/modules/comments/entities/comment.entity';
import { Credential } from 'src/modules/credentials/entities/credential.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'ID único del usuario',
    example: 'b4e4c2ee-ef54-4d72-8f8e-6e54d1b0e8c1',
  })
  id: string = uuid();

  @Column({ unique: true })
  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'admin@fundacion.com',
  })
  email: string;

  @Column({ select: false })
  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'password123',
  })
  password: string;

  @Column({ default: false })
  @ApiProperty({ description: 'Es administrador o no' })
  isAdmin: boolean;

  @Column({ default: false })
  @ApiProperty({ description: 'Indica si debe cambiar la contrasena en el primer login' })
  mustChangePassword: boolean;

  @Column()
  @ApiProperty({ description: 'Nombre del usuario', example: 'Juan Pérez' })
  name: string;

  @OneToMany(() => Credential, (credential) => credential.user)
  @JoinColumn({ name: 'user_id' })
  credentials: Credential[];


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
