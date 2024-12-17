import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';
import { v4 as uuid } from 'uuid';
import { Comment } from 'src/modules/comments/entities/comment.entity';
import { Like } from 'src/modules/likes/entities/like.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID único del post', example: 'c3d9fffc-b8a4-41c8-9330-1dbf6fcbdd68' })
  id: string = uuid();

  @Column()
  @ApiProperty({ description: 'Título del post', example: 'Cómo mejorar el cuidado de los abuelos' })
  title: string;

  @Column()
  @ApiProperty({ description: 'Subtítulo del post', example: 'Estrategias prácticas para el bienestar de los adultos mayores' })
  subtitle: string;

  @Column('text')
  @ApiProperty({ description: 'Contenido principal del post', example: 'El cuidado de los abuelos es fundamental para su bienestar...' })
  mainContent: string;

  @Column()
  @ApiProperty({ description: 'Encabezado del post', example: 'La importancia de cuidar a nuestros abuelos' })
  header: string;

  @Column()
  @ApiProperty({ description: 'Footer o pie de página del post', example: 'Para más información, contacta con nosotros en [email]' })
  footer: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'URL de la imagen destacada del post', example: 'https://miweb.com/images/cuidado-abuelos.jpg' })
  image: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'Fecha de creación del post', example: '2024-11-21T08:00:00Z' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @Column('simple-array', { nullable: true, default: null })
  @ApiProperty({ description: 'Lista de palabras clave asociadas al post', example: ['cuidado', 'abuelos', 'bienestar'], nullable: true })
  keywords: string[] | null;

  @Column('simple-array', { nullable: true, default: null })
  @ApiProperty({ description: 'Imágenes adicionales para el post', example: ['image1.jpg', 'image2.jpg'], nullable: true })
  extraImages: string[] | null;

  @Column()
  @ApiProperty({ description: 'Tamaño o extensión del post', example: 1 })
  size: number;
}
