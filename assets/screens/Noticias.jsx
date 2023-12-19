import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../fb/firebase-config';
import { useUser } from '../../navegacion/MainStack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DatosUsers } from '../../fb/DatosUsers';
import FloatButton from '../componentes/FloatButton';

const Noticias = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView>
        
      </ScrollView>
      <View style={{ flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            //backgroundColor: "red", 
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