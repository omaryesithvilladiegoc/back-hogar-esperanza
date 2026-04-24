import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from 'src/modules/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const DUMMY_PASSWORD_HASH = bcrypt.hashSync('hogar-esperanza-dummy-password', 10);
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jsonWebTokenService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { password, email } = loginDto;

    try {
      const userFound: User = await this.userRepository.findOne({
        where: { email },
        select: {
          id: true,
          email: true,
          password: true,
          isAdmin: true,
          mustChangePassword: true,
        },
      });
      if (!userFound) {
        await bcrypt.compare(password, DUMMY_PASSWORD_HASH);
        await delay(500);
        throw new UnauthorizedException('Credenciales invalidas');
      }

      const validatePassword: Boolean = await bcrypt.compare(
        password,
        userFound.password,
      );
      if (!validatePassword) {
        await delay(500);
        throw new UnauthorizedException('Credenciales invalidas');
      }

      const payload = {
        id: userFound.id,
        email: userFound.email,
        isAdmin: userFound.isAdmin,
        mustChangePassword: userFound.mustChangePassword,
      };

      const token = this.jsonWebTokenService.sign(payload);
      return {
        message: 'Login exitoso',
        token,
        mustChangePassword: userFound.mustChangePassword,
      };
    } catch (error) {
      throw error;
    }
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const { currentPassword, newPassword } = changePasswordDto;

    const userFound = await this.userRepository.findOne({
      where: { id: userId },
      select: {
        id: true,
        password: true,
        mustChangePassword: true,
      },
    });
    if (!userFound) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const currentPasswordValid = await bcrypt.compare(
      currentPassword,
      userFound.password,
    );

    if (!currentPasswordValid) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    userFound.password = await bcrypt.hash(newPassword, 10);
    userFound.mustChangePassword = false;

    await this.userRepository.save(userFound);

    return {
      message: 'Contrasena actualizada con exito',
      mustChangePassword: false,
    };
  }

  async logOut(headers: any) {
    try {
      const token = headers.authorization.substring(7); // Remove 'Bearer ' prefix

      try {
        const payload = this.jsonWebTokenService.verify(token);
        console.log(`Token blacklisted: ${token}`);
        return { message: 'Logout exitoso' };
      } catch (err) {
        throw new UnauthorizedException('Token inválido o expirado');
      }
    } catch (error) {
      throw error;
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
