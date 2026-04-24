import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { AdminSeederService } from './admin-seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AdminSeederService],
})
export class SeederModule {}
