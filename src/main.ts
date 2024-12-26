import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APP_PORT, EMAIL_HOST, EMAIL_PASSWORD } from './helpers/enviroment';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Use Morgan logging middleware
  app.use(morgan('dev'));

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Blog de Hogar Esperanza')
    .setDescription('')
    .addBearerAuth()
    .build();


  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  console.log(`Server running on port http://localhost:${APP_PORT}`);
  await app.listen(APP_PORT);
}

bootstrap();
