
import { ProgramFeature } from 'src/modules/program-feature/entities/program-feature.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {v4 as uuid} from "uuid"

@Entity('programs')
export class Program {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuid();

  @Column({ type: 'varchar', length: 150 })
  title: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'text' })
  image: string;

  @OneToMany(() => ProgramFeature, (feature) => feature.program, {
    cascade: true,
    eager: true,
  })
  features: ProgramFeature[];
}