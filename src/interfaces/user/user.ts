import { Request } from 'express';

export interface IUserPayload {
  user: {
    id: string;
    name: string;
    personal_number: string;
    phone_number: string;
    military_unit: string;
    role: string;
  };
}

export interface RequestExtendedWithUser extends Request {
  user: {
    id: string;
    name: string;
    personal_number: string;
    phone_number: string;
    military_unit: string;
    role: string;
  };
}
