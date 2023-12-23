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
    <View style={styles.container}>
      <FAB
        style={styles.fab}
        icon="pencil"
        onPress={onPressHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    margin: 20,
    marginBottom:50
  },
  fab: {
    position: 'absolute',
    backgroundColor:'cyan'
  },
});

export default FloatButton;
