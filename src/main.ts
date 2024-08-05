import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe, HttpException } from '@nestjs/common';
// import { AllExceptionsFilter } from './exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
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

  // app.useGlobalFilters(new AllExceptionsFilter());

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
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3100);

  console.log(`App running on: ${await app.getUrl()}`);
}
bootstrap();
