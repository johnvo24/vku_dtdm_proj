import { StatusCodes, ReasonPhrases } from '../utils/httpStatusCode';

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
    message?: string;
    statusCode?: number;
    reasonStatusCode?: string;
    metadata?: object;
  }) {
    this.message = message || reasonStatusCode;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res: any, header: object = {}) {
    return res.status(this.status).json(this);
  }
}

class OK extends SuccessResponse {
  constructor(message: string, metadata: object) {
    super({ message, metadata });
  }
}

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

export { OK, CREATED, SuccessResponse };
