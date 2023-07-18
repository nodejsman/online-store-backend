
import { FileValidator } from "@nestjs/common";

export class IsEmptyValidator extends FileValidator {
  isValid(file?: any): boolean | Promise<boolean> {
    return true;
  }

  buildErrorMessage(file: any): string {
    return "File should not be empty!";
  }
}