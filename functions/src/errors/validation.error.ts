import { BaseError } from "./base.errors";

export class ValidationError extends BaseError {

  constructor(message = "Validation Error") {
    super(400, message)
  }
}