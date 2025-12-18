import { BaseError } from "./base.errors";


export class UnauthorizedError extends BaseError {

  constructor(message= "Nao autorizado") {
    super(401, message);
  }
}