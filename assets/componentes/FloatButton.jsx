import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

const FloatButton = () => {
  const navegacion = useNavigation();
  const onPressHandler = () => {
    console.log('Botón flotante presionado');
    navegacion.navigate('Publicar');
  };

  return (
    <FAB
      style={styles.fab}
      icon="pencil"
      onPress={onPressHandler}
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
