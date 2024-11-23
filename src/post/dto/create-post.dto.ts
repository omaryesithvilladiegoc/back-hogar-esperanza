import { IsString, IsNotEmpty, IsOptional, IsUUID, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'Título del post',
    example: 'Cómo mejorar el cuidado de los abuelos',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Subtítulo del post',
    example: 'Estrategias prácticas para el bienestar de los adultos mayores',
  })
  @IsString()
  @IsNotEmpty()
  subtitle: string;

  @ApiProperty({
    description: 'Contenido principal del post',
    example: 'El cuidado de los abuelos es fundamental para su bienestar...',
  })
  @IsString()
  @IsNotEmpty()
  mainContent: string;

  @ApiProperty({
    description: 'Encabezado del post',
    example: 'La importancia de cuidar a nuestros abuelos',
  })
  @IsString()
  @IsNotEmpty()
  header: string;

  @ApiProperty({
    description: 'Footer o pie de página del post',
    example: 'Para más información, contacta con nosotros en [email]',
  })
  @IsString()
  @IsNotEmpty()
  footer: string;

  @ApiProperty({
    description: 'URL de la imagen destacada del post',
    example: 'https://miweb.com/images/cuidado-abuelos.jpg',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  image?: string;

  @ApiProperty({
    description: 'ID del usuario que creó el post (usualmente admin)',
    example: 'b4e4c2ee-ef54-4d72-8f8e-6e54d1b0e8c1',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
