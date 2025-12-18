import { BaseError } from "./base.errors";


export class EmailAlreadyExistsError extends BaseError {


  constructor(message = "Email já está em uso") {
    super(409, message);
  }
}