import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { checkRateLimit, getClientIp } from 'src/common/security/rate-limit';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() createAuthDto: LoginDto, @Req() request: Request) {
    const ip = getClientIp(request);
    const loginByIp = checkRateLimit({
      key: `auth:ip:${ip}`,
      windowMs: 15 * 60_000,
      maxAttempts: 20,
      blockDurationMs: 30 * 60_000,
    });
    const loginByEmail = checkRateLimit({
      key: `auth:email:${ip}:${createAuthDto.email.toLowerCase()}`,
      windowMs: 10 * 60_000,
      maxAttempts: 5,
      blockDurationMs: 30 * 60_000,
    });

    if (!loginByIp.allowed || !loginByEmail.allowed) {
      throw new HttpException(
        'Demasiados intentos de inicio de sesion. Intenta nuevamente mas tarde.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    try {
      return await this.authService.login(createAuthDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Post('logout')
  async logOut(@Headers() headers: Headers) {
    try {
      console.log(headers);
      return await this.authService.logOut(headers);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
