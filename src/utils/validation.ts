import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";

export const validateInput = async (dtoClass: any, body: any) => {
  const dtoInstance = plainToClass(dtoClass, body);
  const errors: ValidationError[] = await validate(dtoInstance);
  if (errors.length > 0) {
    throw new Error(errors.map(err => Object.values(err.constraints || {}).join(", ")).join("; "));
  }
};
