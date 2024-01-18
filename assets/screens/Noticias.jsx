import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FloatButton from '../componentes/FloatButton';
import Publicaciones from '../componentes/Publicaciones';
import { useUser } from '../../fb/DatosUsers';

const Noticias = () => {
  const { usuario } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [usuario]);
  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <Text>Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Publicaciones />
      {usuario && usuario.rol === 'admin' && <FloatButton  pantalla="N"/>}
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