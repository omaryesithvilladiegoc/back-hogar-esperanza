import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      throw error;
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;
    const hashPass = await this.hashPassword(password);
    try {
      const findUserByEmail = await this.userRepository.findOneBy({ email });
      if (findUserByEmail) {
        throw new ConflictException('El email se encuentra registrado');
      }
      const userCreated = this.userRepository.create({
        name,
        email,
        password: hashPass,
        isAdmin: false,
        mustChangePassword: false,
      });
      const userSaved: User = await this.userRepository.save(userCreated);
      if (!userSaved) {
        throw new InternalServerErrorException(
          'Hubo un error al crear el usuario',
        );
      }
      return userSaved;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users: User[] = await this.userRepository.find();
      if (!users) {
        throw new InternalServerErrorException(
          'Hubo un error al obtener los usuarios',
        );
      }
      return users;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const userFound: User = await this.userRepository.findOneBy({ id });
      if (!userFound) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return userFound;
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
