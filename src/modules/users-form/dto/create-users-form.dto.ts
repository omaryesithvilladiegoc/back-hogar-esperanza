import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  Matches,
  IsInt,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class CreateUserFormDto {
  @ApiProperty({
    description: 'Nombre completo del interesado',
    example: 'Juan Pérez',
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    description: 'Correo electrónico del interesado',
    example: 'juan.perez@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Número de teléfono del interesado',
    example: '1234567890',
  })
  @IsString()
  @Matches(/^[0-9+\-\s()]{7,20}$/, {
    message: 'phone must be a valid phone number',
  })
  phone: string;

  @ApiProperty({ description: 'Edad del interesado', example: 35 })
  @IsInt()
  @Min(18)
  @Max(100)
  age: number;

  @ApiProperty({
    description: 'Plan de interés',
    example: 'Hogar permanente compartido',
  })
  @IsString()
  plan: string;

  @IsOptional()
  @IsString()
  website?: string;
}
