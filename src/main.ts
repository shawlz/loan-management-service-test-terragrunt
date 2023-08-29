import './tracer';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionFilter } from './exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new ExceptionFilter());
  await app.listen(process.env.APP_PORT);

  Logger.log(
    `${process.env.APP_NAME} IS LISTENING ON PORT ${process.env.APP_PORT}`,
  );
}
bootstrap();
