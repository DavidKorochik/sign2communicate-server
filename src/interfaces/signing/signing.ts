export interface ISigning {
  id?: string;
  equipment: string[];
  signingDate: string;
  returningDate: string;
  time: string;
  description: string;
  user?: {
    id: string;
    name: string;
    personal_number: string;
    phone_number: string;
    military_unit: string;
    role: string;
  };
}
