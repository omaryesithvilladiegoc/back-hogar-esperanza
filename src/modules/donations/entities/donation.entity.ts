import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';
import { v4 as uuid } from 'uuid';
import { Campaign } from 'src/modules/campaigns/entities/campaign.entity';

@Entity()
export class Donation {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID único de la donación', example: '6b8f35ed-94b6-4b1d-bbb7-fec42b53c25d' })
  id: string = uuid();

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty({ description: 'Monto de la donación', example: 100.00 })
  amount: number;

  @CreateDateColumn()
  @ApiProperty({ description: 'Fecha de la donación', example: '2024-12-16T09:00:00Z' })
  createdAt: Date;

  @ManyToOne(() => Campaign, (campaign) => campaign.donations)
  @ApiProperty({ description: 'Campaña asociada a la donación' })
  campaign: Campaign;

  @ManyToOne(() => User, (user) => user.donations)
  @ApiProperty({ description: 'Usuario que realizó la donación' })
  user: User;
}
