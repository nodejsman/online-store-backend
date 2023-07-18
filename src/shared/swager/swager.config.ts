import { DocumentBuilder } from "@nestjs/swagger";

export const swagerConfig = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('API example')
  .setDescription('The API description')
  .setVersion('1.0')
  .build()


export const options =  {
  operationIdFactory: (
    controllerKey: string,
    methodKey: string
  ) => methodKey
};

