import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';	

@Entity({ name: 'credentials' })
export class Credential {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({
      description: 'ID único de las credenciales',
      example: 'b4e4c2ee-ef54-4d72-8f8e-6e54d1b0e8c1',
    })
    id: string = uuid();

    @Column({ unique: true })
    @ApiProperty({
      description: 'Correo electrónico del usuario',
      example: 'admin@fundacion.com',
    })
    accessToken: string;

    @ManyToOne(() => User, (user) => user.credentials)
    user: User;
}
