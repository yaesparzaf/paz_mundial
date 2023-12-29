import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FloatButton from '../componentes/FloatButton';
import Publicaciones from '../componentes/Publicaciones';

const Noticias = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Publicaciones />
        <FloatButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: 20, 
  },
});


export default Noticias;