import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { disabled } from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';
import { db, storage } from '../../fb/firebase-config';
import { firebase } from '@react-native-firebase/firestore';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../fb/DatosUsers';

const Publicar = () => {
  const {usuario,setUsuario } = useUser();
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');
  const [publicar, setPublicar] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const navegacion = useNavigation();

  const abrirGaleria = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        console.log('Permiso denegado para acceder a la galería');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        //aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const selectedAsset = result.assets && result.assets.length > 0 ? result.assets[0] : null;
        setImageUri(selectedAsset ? selectedAsset.uri : null);
      }
    } catch (error) {
      console.error('Error al abrir la galería: ', error);
    }
  };
  const eliminarImagen = () => {
    setImageUri(null);
  };

  const onSend = async (text, imageUri) => {
    try{
      const coleccion = await addDoc(collection(db,'noticias'),{
        autor: usuario.nombre,
        autor_id: usuario.id,
        texto:text,
        fecha:serverTimestamp(),
      })
      if(imageUri){
        const response = await fetch(imageUri);
        const blob =await response.blob();
        const storageRef = storage.ref(`uploads/noticias/imagenes/${coleccion.id}`);
        await storageRef.put(blob);
        const imageUrl = await storageRef.getDownloadURL();
        await coleccion.update({imagen:imageUrl});
      }
      console.log('mensaje enviado con exito');
      navegacion.navigate('Noticias');
    }
    catch(error){
      console.error('error al enviar datos: '+error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.botones_cont}>
        <TouchableOpacity style={styles.up_fv} onPress={abrirGaleria}>
          <FontAwesome5 name="photo-video" size={24} color="black" />
          <Text style={styles.buttonText}>Foto/Video</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSend(text,imageUri)}
          style={{ ...styles.publicar_btn, backgroundColor: publicar ? '#00FFFF' : '#A9A9A9' }} disabled={!publicar}>
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
        <View style={styles.container}>
          <View style={styles.content}>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />}
            <TouchableOpacity style={styles.eliminarButton} onPress={eliminarImagen}>
              <FontAwesome5 name="times-circle" size={25} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
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
    alignItems: 'center',
    flexDirection: 'row',
    //backgroundColor:'red'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    //backgroundColor: 'red'
  },
  content: {
    width: 360,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    //backgroundColor: '#FF69B4'
  },
  image: {
    width: 350,
    height: 500,
    marginHorizontal: 5,
  },
  buttonText: {
    marginLeft: 5,
  },
  publicar_btn: {
    width: '30%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  eliminarButton: {
    position: 'absolute',
    //backgroundColor: '#A9A9A9',
    //padding: 15,
  },
  text_botones: {
    fontSize: 18,
    color: '#00000'
  }
});

export default Publicar;
