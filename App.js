import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

function App() {
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
    <View style={styles.container}>
      <Text style={styles.text}>Lista de Ciudades:</Text>
      {users.map((user, index) => (
        <Text key={index} style={styles.text}>
          {`${user.id} - ${user.correoElectronico} - ${user.meditando ? 'Meditando' : 'No meditando'}`}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default App;
