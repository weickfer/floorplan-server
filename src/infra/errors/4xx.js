import { ResponseError } from './response-error.js'

export class BadRequestError extends ResponseError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

export class UnauthorizedError extends ResponseError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

export class ForbiddenError extends ResponseError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

export class NotFoundError extends ResponseError {
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}

export class MethodNotAllowedError extends ResponseError {
  constructor(message = 'Method Not Allowed') {
    super(message, 405);
  }
}

export class ConflictError extends ResponseError {
  constructor(message = 'Conflict') {
    super(message, 409);
  }
}

export class UnprocessableEntityError extends ResponseError {
  constructor(message = 'Unprocessable Entity') {
    super(message, 422);
  }
}

export class TooManyRequestsError extends ResponseError {
  constructor(message = 'Too Many Requests') {
    super(message, 429);
  }
}