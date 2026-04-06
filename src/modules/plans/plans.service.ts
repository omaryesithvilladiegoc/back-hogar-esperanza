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

    console.log('Programas insertados correctamente');
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

    return await this.programRepository.save(programCreated);
  }

  async findAll() {
    return await this.programRepository.find({
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
  // 1. Buscamos el programa con sus relaciones
  const program = await this.programRepository.findOne({
    where: { id, isActive: true },
    relations: ['features'], // Cargamos las features para poder editarlas
  });

  // 2. Si no existe, lanzamos una excepción de NestJS
  if (!program) {
    throw new NotFoundException(`Program with ID ${id} not found`);
  }

  // 3. Extraemos los datos del DTO
  const { features, ...dataToUpdate } = updateProgramDto;

  // 4. Actualizamos los campos básicos (title, image, etc.)
  // Object.assign copia las propiedades de dataToUpdate al objeto program
  Object.assign(program, dataToUpdate);

  // 5. Manejamos la actualización de la relación 'features'
  if (features) {
    // Aquí mapeamos los DTOs a la estructura de la entidad
    // Nota: TypeORM suele reemplazar la lista si le pasas un nuevo array
    program.features = features.map(featureDto => {
      return this.featureRepository.create(featureDto);
    });
  }

  // 6. Guardamos los cambios. 
  // Esto hará el UPDATE en la tabla 'program' y gestionará 'features'
  return await this.programRepository.save(program);
}

  async remove(id: string) {
    const program = await this.programRepository.findOneBy({ id });

    if (!program) {
      throw new NotFoundException('Program not found');
    }

    const programUpdate = await this.programRepository.update(id,{
      isActive:false
    })

    return programUpdate;
  }
}