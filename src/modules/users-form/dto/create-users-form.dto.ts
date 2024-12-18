import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsPhoneNumber, IsInt, Min, Max } from 'class-validator';

export class CreateUserFormDto {
  @ApiProperty({ description: 'Nombre completo del interesado', example: 'Juan Pérez' })
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'Correo electrónico del interesado', example: 'juan.perez@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Número de teléfono del interesado', example: '1234567890' })
  @IsPhoneNumber(null)
  phone: string;

  @ApiProperty({ description: 'Edad del interesado', example: 35 })
  @IsInt()
  @Min(18)
  @Max(100)
  age: number;

  @ApiProperty({ description: 'Plan de interés', example: 'Hogar permanente compartido' })
  @IsString()
  plan: string;
}
