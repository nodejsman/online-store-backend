import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from "@nestjs/swagger";
import { swagerConfig, options } from "./shared/swager/swager.config";
import { ValidationPipe } from "@nestjs/common";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
      strategy: 'exposeAll',
    }
  }));
  app.setGlobalPrefix('/api');


  const document = SwaggerModule.createDocument(app, swagerConfig, options);
  SwaggerModule.setup('api', app, document);


  await app.listen(4000);
}
bootstrap().then(() => console.log('App started!'));
