import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe, HttpException } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: 400,
    exceptionFactory: (errors) => {
      const errorResponse = {
        message: 'Validation failed',
        errors: errors.map((error) => {
          const property = error.property;
          const constraintError = Object.values(error.constraints)[0];
          return { property, error: constraintError };
        }),
      };
      return new HttpException(errorResponse, 400);
    },
  }));

  const options: SwaggerDocumentOptions =  {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };

  const config = new DocumentBuilder()
    .setTitle('Dashboard Swagger')
    .setDescription('The dashboard API description')
    .setVersion('1.0')
    .addSecurity('Bearer', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
      name: 'Authorization',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config, options);
  document.security = [{ Bearer: [] }];
  SwaggerModule.setup('/swagger', app, document);

  // await app.listen(port, host);
  await app.listen(3100);

  console.log(`App running on: ${await app.getUrl()}`);
}
bootstrap();
