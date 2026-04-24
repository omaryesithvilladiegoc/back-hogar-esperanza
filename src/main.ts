import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APP_PORT, CORS_ORIGINS } from './helpers/enviroment';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { checkRateLimit, getClientIp } from './common/security/rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT || APP_PORT) || 3001;
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.disable('x-powered-by');
  expressApp.set('trust proxy', 1);

  const allowedOrigins =
    CORS_ORIGINS?.split(',').map((origin) => origin.trim()).filter(Boolean) || [
      'https://frontend-production-hogar-esperanza.vercel.app',
      'http://localhost:3000',
    ];

  // Enable CORS
  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(express.json({ limit: '100kb' }));
  app.use(express.urlencoded({ extended: true, limit: '100kb' }));
  app.use((req: Request, res: Response, next: NextFunction) => {
    const ip = getClientIp(req);
    const rateLimit = checkRateLimit({
      key: `global:${ip}`,
      windowMs: 60_000,
      maxAttempts: 120,
      blockDurationMs: 5 * 60_000,
    });

    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=()',
    );

    if (!rateLimit.allowed) {
      res.setHeader(
        'Retry-After',
        Math.ceil(rateLimit.retryAfterMs / 1000).toString(),
      );
      return res.status(429).json({
        message: 'Demasiadas solicitudes. Intenta nuevamente en unos minutos.',
      });
    }

    next();
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Use Morgan logging middleware
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Blog de Hogar Esperanza')
    .setDescription('')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_SWAGGER === 'true') {
    SwaggerModule.setup('api', app, document);
  }

  console.log(`Server running on port ${port}`);
  await app.listen(port);
}

bootstrap();
