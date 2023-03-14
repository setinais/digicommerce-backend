import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { PrismaService } from './services/prisma/prisma.service';
import { textSync } from 'figlet';
import { LogLevel, ValidationPipe, Logger } from '@nestjs/common';
import { EnvironmentModule } from './modules/environment/environment.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const { API_NAME, API_PORT, LOGGER, SWAGGER_ENABLED } = EnvironmentModule.env;
  const app = await NestFactory.create(AppModule, {
    logger: LOGGER as LogLevel[],
    cors: true,
  });
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();
  // if (SWAGGER_ENABLED) {
  //   const config = new DocumentBuilder()
  //     .setTitle('API Template')
  //     .setDescription('Template base.')
  //     .setVersion('0.0.1')
  //     .addTag('Template')
  //     .build();
  //   const document = SwaggerModule.createDocument(app, config);
  //   SwaggerModule.setup('api-pricer', app, document);
  // }
  // await app.listen(API_PORT);
  console.log(`${textSync(API_NAME, 'Standard')}`);
  Logger.verbose(`Running in port: ${API_PORT}  🚀`, 'Bootstrap');
}

bootstrap();
