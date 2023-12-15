import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { useUser } from '../../fb/DatosUsers';

const Perfil = () => {
  const { usuario, setUsuario } = useUser();
  console.log(usuario);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp' }}
        style={styles.profileImage}
      />
      <Text>Perfil de {usuario.nombre}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  profileImage: {
    width: 250,  // Ajusta el ancho según tus necesidades
    height: 150, // Ajusta la altura según tus necesidades
    borderRadius: 100, // Ajusta el radio de la esquina para que sea un círculo
    marginBottom: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Perfil