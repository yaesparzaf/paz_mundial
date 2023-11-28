import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

function App() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    async function fetchData() {
      const citiesCol = collection(db, 'usuarios');
      const citySnapshot = await getDocs(citiesCol);
      const cityList = citySnapshot.docs.map(doc => doc.data());
      setCities(cityList);
    }

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lista de Ciudades:</Text>
      {cities.map((city, index) => (
        <Text key={index} style={styles.text}>
          {`${city.id} - ${city.correoElectronico} - ${city.meditando ? 'Meditando' : 'No meditando'}`}
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
