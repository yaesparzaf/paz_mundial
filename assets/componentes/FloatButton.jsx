import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

const FloatButton = ({pantalla}) => {
  const navegacion = useNavigation();
  const navegarAPublicar = () => {
    console.log('al presionar: ',pantalla);
    if (pantalla === 'V') {
      //navegacion.navigate('EditVideos');
    } else if(pantalla ==='N'){
      navegacion.navigate('Publicar');
    }
  };
  console.log(pantalla);
  return (
    <FAB
      style={styles.fab}
      icon="pencil"
      onPress={navegarAPublicar}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 20,
    right: 10,
    bottom: 20,
    backgroundColor: 'cyan',
  },
});
export default FloatButton;
