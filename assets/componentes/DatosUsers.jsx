import React from 'react'
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';


export default function DatosUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
  
      async function fetchData() {
        const users = collection(db, 'usuarios');
        const usersSnapshot = await getDocs(users);
        const UsersList = usersSnapshot.docs.map(doc => doc.data());
        setUsers(UsersList);
      }
  
      fetchData();
    }, []);
  
    return (
      <View style={styles.cabecera}>
        <Text style={styles.text}>Lista de Ciudades:</Text>
        {users.map((user, index) => (
          <Text key={index} style={styles.text}>
            {`${user.id} - ${user.correoElectronico} - ${user.meditando ? 'Meditando' : 'No meditando'}`}
          </Text>
        ))}
      </View>
    );
}
