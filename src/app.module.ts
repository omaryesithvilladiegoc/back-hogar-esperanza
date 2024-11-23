import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './helpers/enviroment';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [typeorm],
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) =>
      configService.get('typeorm'),
  }),PostModule, UserModule, AuthModule, FileUploadModule,
JwtModule.register({
  global:true,
  secret:JWT_SECRET,
  signOptions:{
    expiresIn:'1h'
  }
})],
  controllers: [],
  providers: [],
})
export class AppModule {}
