// import { Users } from './employee';
export interface Users {
  id:string ;
  photoURL?: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  dateInscription: string;
  lieu: string;
  typeStructure: string;
  typeCompte: string;
  statutCompte: string;
  typeProfil: string;
}

export type SortField = keyof Users;
export type SortDirection = 'asc' | 'desc';









