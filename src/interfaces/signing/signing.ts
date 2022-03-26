export interface ISigning {
  id?: string;
  equipment: string[];
  signingDate: string;
  returningDate: string;
  time: string;
  description: string;
  user: { id: string };
}
