import { BaseEntity } from 'typeorm';

export interface IUser {
  name: string;
  personal_number: string;
  phone_number: string;
  military_unit: string;
  role: string;
}
