import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository:Repository<User>, private readonly jsonWebTokenService: JwtService){}


  async login(loginDto: LoginDto) {
    const {password,email} = loginDto

    try {
      const userFound: User = await this.userRepository.findOneBy({email})
      if(!userFound) throw new UnauthorizedException('Credenciales invalidas')
      const validatePassword: Boolean = await bcrypt.compare(password,userFound.password)
    if(!validatePassword) throw new UnauthorizedException('Credenciales invalidas')
    const payload = {
  id:userFound.id,
email:userFound.email,
isAdmin:userFound.isAdmin
}

const token = this.jsonWebTokenService.sign(payload)
return {
  message:'Login exitoso',
  token
}
    } catch (error) {
      throw new BadRequestException (error.message)

    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
