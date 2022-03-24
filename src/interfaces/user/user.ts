import { Request } from 'express';

export interface IUserPayload {
  user: {
    id: string;
  };
}

export interface RequestExtendedWithUser extends Request {
  user: {
    id: string;
  };
}
