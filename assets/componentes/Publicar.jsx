import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Galeria from './Galeria';
import { disabled } from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';

const Publicar = () => {
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');
  const [publicar, setPublicar] = useState(false);
  console.log(publicar);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.botones_cont}>
        <Galeria />
        <TouchableOpacity style={styles.publicar_btn} disabled={!publicar}>
          <Text style={{ ...styles.text_botones, color: publicar ? '#000000' : '#D3D3D3' }}>Publicar</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View>
          <TextInput
            placeholder='Escribe un texto...'
            style={styles.input}
            value={text}
            onChangeText={(newText) => {
              onChangeText(newText);
              setPublicar(newText.length > 0);
            }}
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
    //borderWidth: 1,
    textAlignVertical: 'top',
    padding: 10,
    fontSize: 20,
  },
  botones_cont: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    //backgroundColor: 'green'
  },
  up_fv: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor:'white'
  },
  publicar_btn: {
    width:'20%',
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:5,
    borderColor:'#FFFF'
  },
  text_botones:{
    fontSize:18,
    color:'#00000'
  }
});

export default Publicar;
