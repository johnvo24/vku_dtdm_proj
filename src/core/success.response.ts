import { StatusCodes, ReasonPhrases } from '../utils/httpStatusCode';
import { Response } from 'express';

// src/core/success.response.ts
class SuccessResponse {
  message: string;
  status: number;
  metadata: object;

  constructor({
    message,
    statusCode = StatusCodes.OK,
    reasonStatusCode = ReasonPhrases.OK,
    metadata = {},
  }: {
    message: string;  // message phải là string
    statusCode?: number;
    reasonStatusCode?: string;
    metadata?: object;
  }) {
    this.message = message;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res: any) {
    return res.status(this.status).json(this);
  }
}

// Sửa lớp OK
class OK extends SuccessResponse {
  constructor(message: string, metadata: object) {
    super({ message, statusCode: StatusCodes.OK, reasonStatusCode: ReasonPhrases.OK, metadata });
  }
}

// Sửa lớp CREATED
class CREATED extends SuccessResponse {
  constructor({
    message,
    statusCode = StatusCodes.CREATED,
    reasonStatusCode = ReasonPhrases.CREATED,
    metadata,
  }: {
    message: string;
    statusCode?: number;
    reasonStatusCode?: string;
    metadata: object;
  }) {
    super({ message, statusCode, reasonStatusCode, metadata });
  }
}

//no content
class NoContentSuccess extends SuccessResponse {
  constructor(message: string) {
    super({ message, statusCode: StatusCodes.NO_CONTENT, reasonStatusCode: ReasonPhrases.NO_CONTENT });
  }
}


export { OK, CREATED, SuccessResponse, NoContentSuccess };

