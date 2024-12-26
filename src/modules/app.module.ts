import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from '../config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';
import { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_USERNAME, JWT_SECRET } from '../helpers/enviroment';
import { DonationsModule } from './donations/donations.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { UsersFormModule } from './users-form/users-form.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { SendMailsModule } from './send-mails/send-mails.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [typeorm],
  }),
  MailerModule.forRoot({
    transport: {
      host: EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD, 
      },
    },
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) =>
      configService.get('typeorm'),
  }),PostModule, UserModule, AuthModule,UsersFormModule,DonationsModule,CampaignsModule, FileUploadModule,CommentsModule,
  LikesModule,
JwtModule.register({
  global:true,
  secret:JWT_SECRET,
  signOptions:{
    expiresIn:'1h'
  }
}),
SendMailsModule,

],
  controllers: [],
  providers: [],
})
export class AppModule {}
