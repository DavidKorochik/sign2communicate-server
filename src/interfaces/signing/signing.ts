export interface ISigning {
  id?: string;
  equipment: string[];
  signingDate: string | Date;
  returningDate: string | Date;
  time: string;
  description: string;
  status: string;
  user?: {
    id: string;
    name: string;
    personal_number: string;
    phone_number: string;
    military_unit: string;
    role: string;
  };
}
