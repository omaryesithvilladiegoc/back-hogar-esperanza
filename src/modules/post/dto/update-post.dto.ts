import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Titulo del post',
    example: 'Como mejorar el cuidado de los abuelos',
  })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Subtitulo del post',
    example: 'Estrategias practicas para el bienestar',
  })
  subtitle?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Contenido principal del post',
    example: 'Contenido actualizado del post...',
  })
  mainContent?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Encabezado del post',
    example: 'La importancia de cuidar a nuestros abuelos',
  })
  header?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Pie del post',
    example: 'Para mas informacion contactanos.',
  })
  footer?: string;

  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({
    description: 'Palabras clave del post',
    example: ['cuidado', 'bienestar'],
  })
  keywords?: string[];

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(12)
  @ApiPropertyOptional({
    description: 'actualizar la medida de post',
    example: 5,
  })
  size?: number;
}
