import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Adjust the import path

import { Users} from '../types/user';


export const getUsers = async (): Promise<Users[]> => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const data:Users[]=[];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() } as Users); // Cast to Users
  });
  return data;
};