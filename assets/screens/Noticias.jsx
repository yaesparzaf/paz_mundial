import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../fb/firebase-config';
import { useUser } from '../../navegacion/MainStack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DatosUsers } from '../../fb/DatosUsers';

/*export  function DatosUsers() {
  const { usuario, setUsuario } = useUser();
  
  useLayoutEffect(() => {
    async function fetchUser(nombre, email) {
      const usuariosRef = collection(db, 'usuarios');
      const q = query(usuariosRef, where('nombre', '==', nombre), where('email', '==', email));
      const querySnapShot = await getDocs(q);
      if (querySnapShot.docs.length > 0) {
        const userData = querySnapShot.docs[0].data();
        setUsuario(userData);
        console.log('el usuario existe');
        return true;
      } else {
        console.log('NO existe existe');
        return false;
      }
    }
    
    const usernameABuscar = 'Yamil';
    const correoABuscar = 'yamilya.esparza25@gmail.com';
    fetchUser(usernameABuscar, correoABuscar);
  }, [setUsuario]);

  return (
    <View style={styles.container}>
      {usuario ? (
        <Text>
          Nombre: {usuario.nombre} - Email: {usuario.email}
        </Text>
      ) : (
        <Text>No se encontró el usuario.</Text>
      )}
    </View>
  );

}*/

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
const Noticias = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>noticias</Text>
      </View>
    </SafeAreaView>
  );
};

export default Noticias;