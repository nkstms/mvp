"use client"
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Users} from '@/types/user';



import ClientTable from '@/components/ClientTable';
import { useEffect , useState } from "react";


export default function Page() {

  const [users, setUsers] = useState<Users[]>([]);//
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const getFirebaseUSers = async () => {
      try{
      const data = await getUsers();
      setUsers(data);
      setError(null)
    }catch(error){
      console.error("Failed to fetch users:",error)
      setError("Failed to fetch users. Please try again later.");
    }finally{
      setLoading(false)
    }
    };
    
    getFirebaseUSers();
  }, []);//

  const getUsers = async (): Promise<Users[]> => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const data:Users[]=[];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() } as Users); 
    });
    return data;
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div>
      <h1>Admin Dashboard</h1>
      
    </div>
      <main className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold dark:text-white">Datatable</h2>
        </div>
        <ClientTable initialData={users} />
      </main>
      
    </div>
  );
}
