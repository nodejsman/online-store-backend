import { HttpException, HttpStatus, ValidationError, ValidationPipe } from "@nestjs/common";

export const validationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  exceptionFactory: (validationErrors: ValidationError[]) => {

    const errors: object = validationErrors.reduce((acc: object, item: ValidationError) => {

      const { property, constraints } = item;
      acc[property] = Object.values(constraints);
      return acc;

    }, {});
    throw new HttpException(
      { message: "Validation error", errors },
      HttpStatus.UNPROCESSABLE_ENTITY
    );
  }
});