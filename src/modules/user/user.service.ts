import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from "bcrypt"

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>){}

  private async hashPassword(password: string):Promise<string> {
    try {
      const saltRounds = 10;
      const hash = bcrypt.hashSync(password, saltRounds)
      return hash
    } catch (error) {
      throw error
    }
  }


  async create(createUserDto: CreateUserDto):Promise<User> {
    const {name, email, password} = createUserDto
    const hashPass = await this.hashPassword(password)
    try {
      const findUserByEmail = await this.userRepository.findOneBy({email})
      if(findUserByEmail) throw new BadRequestException('El email se encuentra registrado')
      const userCreated =this.userRepository.create({
    name,
  email,password:hashPass})
  const userSaved: User = await this.userRepository.save(userCreated)
  if(!userSaved) throw new BadRequestException('Hubo un error al crear el usuario')
  return userSaved
    } catch (error) {
      throw error.message
    }
  }

  async findAll():Promise<User[]> {
    try {
      const users:User[] = await this.userRepository.find()
      if(!users) throw new BadRequestException('Hubo un error al obtener los usuario')
      return users
    } catch (error) {
      throw error.message
    }
  }

 async  findOne(id: string):Promise<User> {
  try {
    const userFound:User = await this.userRepository.findOneBy({id})
    if(userFound) throw new BadRequestException('Hubo un error al obtener el usuario')
    return userFound
  } catch (error) {
    throw error.message
  }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
