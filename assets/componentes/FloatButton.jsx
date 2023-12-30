import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

const FloatButton = () => {
  const navegacion = useNavigation();
  const onPressHandler = () => {
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
