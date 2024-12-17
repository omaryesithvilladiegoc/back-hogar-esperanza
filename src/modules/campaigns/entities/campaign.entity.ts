import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';
import { Donation } from 'src/modules/donations/entities/donation.entity';

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID único de la campaña', example: 'ebd7f6a3-5d33-487a-bc8f-4b7fa29e4c6b' })
  id: string = uuid();

  @Column()
  @ApiProperty({ description: 'Nombre de la campaña', example: 'Recaudación para el Hogar Esperanza' })
  name: string;

  @Column('text')
  @ApiProperty({ description: 'Descripción de la campaña', example: 'Nuestra campaña busca recaudar fondos para mejorar las instalaciones del hogar.' })
  description: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'Fecha de inicio de la campaña', example: '2024-12-16T08:00:00Z' })
  startDate: Date;

  @Column()
  @ApiProperty({ description: 'Fecha de fin de la campaña', example: '2025-12-16T08:00:00Z' })
  endDate: Date;

  @OneToMany(() => Donation, (donation) => donation.campaign)
  @ApiProperty({ description: 'Lista de donaciones realizadas a esta campaña' })
  donations: Donation[];
}
