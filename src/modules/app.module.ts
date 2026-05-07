import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from '../config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';
import {
  JWT_AUDIENCE,
  JWT_ISSUER,
  JWT_SECRET,
} from '../helpers/enviroment';
import { createMailerConfig } from '../config/mailer';
import { DonationsModule } from './donations/donations.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { UsersFormModule } from './users-form/users-form.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { SendMailsModule } from './send-mails/send-mails.module';
import { FilesModule } from './files/files.module';
import { PlansModule } from './plans/plans.module';
import { CredentialsModule } from './credentials/credentials.module';
import { ProgramFeatureModule } from './program-feature/program-feature.module';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    MailerModule.forRoot(createMailerConfig()),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    PostModule,
    UserModule,
    AuthModule,
    UsersFormModule,
    DonationsModule,
    CampaignsModule,
    FileUploadModule,
    CommentsModule,
    LikesModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
      },
    }),
    SendMailsModule,
    FilesModule,
    PlansModule,
    CredentialsModule,
    ProgramFeatureModule,
    SeederModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
