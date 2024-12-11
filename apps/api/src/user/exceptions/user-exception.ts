import { AppException } from "../../app-exception";
import { HttpStatus } from "@nestjs/common";

export class UserException extends AppException {}

export class UserNotFoundException extends UserException {
  public static idNotFound(id: string): UserNotFoundException {
    return new UserNotFoundException(
      `User with id: ${id} not found.`,
      HttpStatus.NOT_FOUND,
    );
  }

  public static emailNotFound(email: string): UserNotFoundException {
    return new UserNotFoundException(
      `User with email: ${email} not found.`,
      HttpStatus.NOT_FOUND,
    );
  }
}

export class UserCannotBeCreatedException extends UserException {
  public static emailAlreadyExists(
    email: string,
  ): UserCannotBeCreatedException {
    return new UserCannotBeCreatedException(
      `User with email: ${email} already exists.`,
      HttpStatus.CONFLICT,
    );
  }
}
