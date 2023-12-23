import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { db } from '../../fb/firebase-config';
import { SafeAreaView } from 'react-native-safe-area-context';
import FloatButton from '../componentes/FloatButton';
import Publicaciones from '../componentes/Publicaciones';

const Noticias = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Publicaciones />
      <View style={{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
      }}>
        <FloatButton />
      </View>

    </SafeAreaView>
  );
};

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
    marginTop: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    marginTop: 10, // Espacio entre cada elemento de la lista
  },
});


export default Noticias;