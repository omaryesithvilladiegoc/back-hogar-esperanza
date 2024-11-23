import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/post/entities/post.entity';
import {v4 as uuid} from 'uuid'
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

  @Column({default:true})
  @ApiProperty({ description: 'es administrador o no'})
  isAdmin: boolean

  @Column()
  @ApiProperty({ description: 'Nombre del usuario', example: 'Juan Pérez' })
  name: string;

  // Relación con Post: Un usuario puede tener muchos posts
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
