import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { PrismaService } from './services/prisma/prisma.service';
import { textSync } from 'figlet';
import { LogLevel, ValidationPipe, Logger } from '@nestjs/common';
import { EnvironmentModule } from './modules/environment/environment.module';

async function bootstrap() {
  const { API_NAME, API_PORT, LOGGER } = EnvironmentModule.env;
  const app = await NestFactory.create(AppModule, {
    logger: LOGGER as LogLevel[],
  });
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();
  const allowList = ['http://localhost'];
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  console.log(`${textSync(API_NAME, 'Standard')}`);
  Logger.verbose(`Running in port: ${API_PORT}  🚀`, 'Bootstrap');
}

bootstrap();
