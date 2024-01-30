const HttpErrorTypes = Object.freeze({
  BAD_REQUEST: "BAD_REQUEST",
  NOT_FOUND: "NOT_FOUND",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED",
});

class HttpError extends Error {
  constructor(errorType) {
    const errorMessages = {
      [HttpErrorTypes.BAD_REQUEST]: {
        message:
          "Bad Request: The request could not be understood or was missing required parameters.",
        statusCode: 400,
      },
      [HttpErrorTypes.NOT_FOUND]: {
        message: "Not Found: The requested resource could not be found.",
        statusCode: 404,
      },
      [HttpErrorTypes.INTERNAL_SERVER_ERROR]: {
        message:
          "Internal Server Error: Something went wrong on the server side.",
        statusCode: 500,
      },
      [HttpErrorTypes.UNAUTHORIZED]: {
        message:
          "Unauthorized: Authentication is required and has failed or has not been provided.",
        statusCode: 401,
      },
      [HttpErrorTypes.FORBIDDEN]: {
        message: "Forbidden: Access is forbidden to the requested resource.",
        statusCode: 403,
      },
      [HttpErrorTypes.METHOD_NOT_ALLOWED]: {
        message:
          "Method Not Allowed: The method received in the request-line is known by the origin server but not supported by the target resource.",
        statusCode: 405,
      },
    };

    const { message, statusCode } = errorMessages[errorType];
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
  }
}

module.exports = { HttpError, HttpErrorTypes };
