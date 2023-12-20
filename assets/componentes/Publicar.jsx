import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Galeria from './Galeria';

const Publicar = () => {
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');
  const [publicar,setPublicar] = useState('false');
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'blue' }}>
      <View style={styles.botones_cont}>
        <Galeria/>
        <TouchableOpacity>
          <Text>Publicar</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View>
          <TextInput
            placeholder='Escribe un texto...'
            style={styles.input}
            value={text}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    textAlignVertical: 'top',
    padding: 10,
    fontSize: 20,
    backgroundColor: 'red',
  },
  botones_cont: {
    flexDirection: 'row',
    justifyContent:'space-between',
    backgroundColor: 'green'
  },
  up_fv: {
    width: '30%',
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  buttonText: {
    marginLeft: 5,
  },
});

export default Publicar;
