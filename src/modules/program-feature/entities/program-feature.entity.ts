import { Program } from 'src/modules/plans/entities/plan.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {v4 as uuid} from "uuid"

@Entity('program_features')
export class ProgramFeature {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuid();

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Program, (program) => program.features, {
    onDelete: 'CASCADE',
  })
  program: Program;
}