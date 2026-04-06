import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APP_PORT } from './helpers/enviroment';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(APP_PORT) || 3001;

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Use Morgan logging middleware
  app.use(morgan('dev'));

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Blog de Hogar Esperanza')
    .setDescription('')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  console.log(`Server running on port http://localhost:${port}`);
  await app.listen(port);
}

bootstrap();
