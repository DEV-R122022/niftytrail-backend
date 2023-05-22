import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Niftytrail API')
    .setDescription('This repository is a NestJS server for the NiftyTrail client application. It is written in TypeScript for improved type safety and includes various endpoints for authentication, data retrieval, and other functionalities.')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, config));

  await app.listen(3000);
}
bootstrap();
