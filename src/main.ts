import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {APP_PORT} from "./helpers/enviroment"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  const swaggerOptions = new DocumentBuilder()
  .setTitle('Blog de Hogar Esperanza')
  .setDescription('')
  .addBearerAuth()
  .build()

  const document = SwaggerModule.createDocument(app,swaggerOptions)
  SwaggerModule.setup('api',app,document)
  console.log(`Server running on port http://localhost:${APP_PORT}`);
  await app.listen(APP_PORT);
}
bootstrap();
