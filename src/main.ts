import "dotenv/config"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RequestMethod, ValidationPipe } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Niftytrail API')
    .setDescription('This repository is a NestJS server for the NiftyTrail client application. It is written in TypeScript for improved type safety and includes various endpoints for authentication, data retrieval, and other functionalities.')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, config));

  app.enableVersioning();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix("api", {
    exclude: [{ path: "/", method: RequestMethod.GET }],
  });
  await app.listen(port)
    .then(() => console.log(`APP LISTENING ON PORT ${port}`))
    .catch((error) => console.log("APP FAILED TO LISTEN", error));

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
