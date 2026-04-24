import {
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program } from './entities/plan.entity';
import { programs } from 'src/assets/plans';
import { ProgramFeature } from '../program-feature/entities/program-feature.entity';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class ProgramService implements OnModuleInit {
  constructor(
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>,
    @InjectRepository(ProgramFeature)
    private readonly featureRepository: Repository<ProgramFeature>,
  ) {}

  async onModuleInit() {
    await this.seedPrograms();
  }

  async seedPrograms() {
    const count = await this.programRepository.count();

    if (count > 0) {
      return;
    }

    for (const program of programs) {
      const featuresProgram = program.features.map((feature) =>
        this.featureRepository.create({
          description: feature,
        }),
      );

      const programCreated = this.programRepository.create({
        title: program.title,
        image: program.image,
        features: featuresProgram,
      });

      await this.programRepository.save(programCreated);
    }
  }

  async create(createProgramDto: CreatePlanDto) {
    const featuresProgram = createProgramDto.features.map((feature) =>
      this.featureRepository.create({
        description: feature.description,
      }),
    );

    const programCreated = this.programRepository.create({
      title: createProgramDto.title,
      image: createProgramDto.image,
      features: featuresProgram,
    });

    return this.programRepository.save(programCreated);
  }

  async findAll() {
    return this.programRepository.find({
      where: {
        isActive: true,
      },
      order: {
        id: 'ASC',
      },
      relations: ['features'],
    });
  }

  async findOne(id: string) {
    const program = await this.programRepository.findOne({
      where: { id, isActive: true },
      relations: ['features'],
    });

    if (!program) {
      throw new NotFoundException('Program not found');
    }

    return program;
  }

  async update(id: string, updateProgramDto: UpdatePlanDto) {
    const program = await this.programRepository.findOne({
      where: { id, isActive: true },
      relations: ['features'],
    });

    if (!program) {
      throw new NotFoundException(`Program with ID ${id} not found`);
    }

    const { features, ...dataToUpdate } = updateProgramDto;

    Object.assign(program, dataToUpdate);

    if (features) {
      program.features = features.map((featureDto) =>
        this.featureRepository.create({
          description: featureDto.description,
        }),
      );
    }

    return this.programRepository.save(program);
  }

  async remove(id: string) {
    const program = await this.programRepository.findOne({
      where: { id, isActive: true },
      relations: ['features'],
    });

    if (!program) {
      throw new NotFoundException('Program not found');
    }

    program.isActive = false;
    await this.programRepository.save(program);

    return {
      success: true,
      id: program.id,
    };
  }
}
