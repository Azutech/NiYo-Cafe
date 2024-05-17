import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<string>('PORT');
  //  app.setGlobalPrefix('/api/v1');

  app.useGlobalPipes(
    new ValidationPipe({whitelist: true, forbidNonWhitelisted: true})
  )


  await app.listen(port, () => logger.log(`App running on Port: ${port}`));
}

bootstrap()