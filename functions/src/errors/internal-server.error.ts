import { BaseError } from "./base.errors";

export class InternalServerError extends BaseError {

  constructor(message = "Internal Server Error") {
    super(500, message)
  }
}