import { BaseError } from "./base.errors";


export class NotFoundError extends BaseError {

  constructor(message: string) {
    super(404, message);
  }
}