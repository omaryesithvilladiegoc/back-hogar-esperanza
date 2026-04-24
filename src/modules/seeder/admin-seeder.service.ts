import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { ADMIN_EMAIL, ADMIN_NAME, ADMIN_PASSWORD } from 'src/helpers/enviroment';

@Injectable()
export class AdminSeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AdminSeederService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onApplicationBootstrap() {
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      this.logger.warn(
        'ADMIN_EMAIL o ADMIN_PASSWORD no estan definidos en .env. Se omite el seeder del admin.',
      );
      return;
    }

    const existingAdmin = await this.userRepository.findOneBy({
      email: ADMIN_EMAIL,
    });

    if (existingAdmin) {
      this.logger.log(`El admin ya existe: ${ADMIN_EMAIL}`);
      return;
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    const admin = this.userRepository.create({
      name: ADMIN_NAME || 'Administrador',
      email: ADMIN_EMAIL,
      password: hashedPassword,
      isAdmin: true,
      mustChangePassword: true,
    });

    await this.userRepository.save(admin);
    this.logger.log(`Admin creado correctamente: ${ADMIN_EMAIL}`);
  }
}
