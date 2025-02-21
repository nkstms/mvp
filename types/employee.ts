// import { Users } from './employee';
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Adjust the import path


export interface Users {
  id?:string ;
  photoURL: string;
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

export const getUsers = async (): Promise<Users[]> => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const data:Users[]=[];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() } as Users); // Cast to Users
  });
  return data;
};




