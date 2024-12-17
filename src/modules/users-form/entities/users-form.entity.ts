import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class UsersForm {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID único del formulario de usuario', example: '9b4e5c1f-4532-46f2-9c9b-3d42c5cf8ed1' })
  id: string;

  @Column()
  @ApiProperty({ description: 'Nombre completo del interesado', example: 'Juan Pérez' })
  fullName: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'Correo electrónico del interesado', example: 'juan.perez@email.com' })
  email: string;

  @Column()
  @ApiProperty({ description: 'Número de teléfono del interesado', example: '1234567890' })
  phone: string;

  @Column()
  @ApiProperty({ description: 'Edad del interesado', example: 35 })
  age: number;

  @Column()
  @ApiProperty({ description: 'Plan de interés', example: 'Hogar permanente compartido' })
  plan: string;

}
