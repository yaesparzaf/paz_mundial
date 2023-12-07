import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';

//usar useLayoutEffect para renderizar cosas en pantalla

export default function DatosUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    

    async function fetchData() {
      const users = collection(db, 'usuarios');
      const usersSnapshot = await getDocs(users);
      const UsersList = usersSnapshot.docs.map(doc => doc.data());
      setUsers(UsersList);
    }

    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Text style={styles.title}>Lista de usuarios:</Text>
      {users.map((user, index) => (
        <Text key={index} style={styles.text}>
          {`${user.id} - ${user.correoElectronico} - ${user.meditando ? 'Meditando' : 'No meditando'}`}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: 20, // Ajusta esto según sea necesario para el espacio adicional al final
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20, // Espacio superior para el título
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    marginTop: 10, // Espacio entre cada elemento de la lista
  },
});
