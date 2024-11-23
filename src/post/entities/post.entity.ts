import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { v4 as uuid } from 'uuid';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID único del post', example: 'c3d9fffc-b8a4-41c8-9330-1dbf6fcbdd68' })
  id: string = uuid();

  // Título principal del post
  @Column()
  @ApiProperty({ description: 'Título del post', example: 'Cómo mejorar el cuidado de los abuelos' })
  title: string;

  // Subtítulo del post
  @Column()
  @ApiProperty({ description: 'Subtítulo del post', example: 'Estrategias prácticas para el bienestar de los adultos mayores' })
  subtitle: string;

  // Contenido principal del post
  @Column('text')
  @ApiProperty({ description: 'Contenido principal del post', example: 'El cuidado de los abuelos es fundamental para su bienestar...' })
  mainContent: string;

  // Encabezado, puede ser un resumen o una frase destacada del post
  @Column()
  @ApiProperty({ description: 'Encabezado del post', example: 'La importancia de cuidar a nuestros abuelos' })
  header: string;

  // Pie de página, puede contener información adicional o datos de contacto
  @Column()
  @ApiProperty({ description: 'Footer o pie de página del post', example: 'Para más información, contacta con nosotros en [email]' })
  footer: string;

  // URL o ruta de la imagen destacada del post
  @Column({ nullable: true })
  @ApiProperty({ description: 'URL de la imagen destacada del post', example: 'https://miweb.com/images/cuidado-abuelos.jpg' })
  image: string;

  // Fecha de creación del post
  @CreateDateColumn()
  @ApiProperty({ description: 'Fecha de creación del post', example: '2024-11-21T08:00:00Z' })
  createdAt: Date;

  // Relación con el Usuario: Un post es creado por un único usuario (admin)
  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  // Array de palabras clave, opcional y nuleable
  @Column('simple-array', { nullable: true, default: null })
  @ApiProperty({ description: 'Lista de palabras clave asociadas al post', example: ['cuidado', 'abuelos', 'bienestar'], nullable: true })
  keywords: string[] | null;
}
