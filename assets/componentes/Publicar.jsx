import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../../fb/firebase-config';
import { ref, uploadString, getDownloadURL, getStorage } from 'firebase/storage';
import { collection, addDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../fb/DatosUsers';

const Publicar = () => {
  const { usuario, setUsuario } = useUser();
  const [titulo, setTitulo] = React.useState();
  const [asunto, setAsunto] = useState('');
  const [text, onChangeText] = React.useState('');
  const [publicar, setPublicar] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [guardandoImagen, setGuardandoImagen] = useState(false);
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
        quality: 1,
      });

      if (!result.canceled) {
        const selectedAsset = result.assets && result.assets.length > 0 ? result.assets[0] : null;
        setImageUri(selectedAsset ? selectedAsset.uri : null);
        setPublicar(titulo && (selectedAsset || text.length > 0));
      }
    } catch (error) {
      console.error('Error al abrir la galería: ', error);
    }
  };

  const eliminarImagen = () => {
    setImageUri(null);
    setPublicar(titulo && text.length > 0);
  };

  const onSend = async (titulo, asunto, text, imageUri) => {
    try {
      const coleccionRef = await addDoc(collection(db, 'noticias'), {
        titulo: titulo,
        asunto: asunto,
        autor: usuario.nombre,
        autor_id: usuario.id,
        fecha: serverTimestamp(),
        texto: text,
      });
  
      if (coleccionRef) {
        console.log('Referencia de la colección:', coleccionRef.id);
        if (imageUri) {
          const storage = getStorage();
          const storageRef = ref(storage, `uploads/noticias/imagenes/${coleccionRef.id}`);
          try {
            setGuardandoImagen(true); // Indicar que se está guardando la imagen
            const response = await fetch(imageUri);
            const blob = await response.blob();
            await uploadString(storageRef, blob);
            const imageUrl = await getDownloadURL(storageRef);
            await updateDoc(coleccionRef, { imagen: imageUrl });
            console.log('Imagen subida con éxito');
          } catch (error) {
            console.error(error);
          } finally {
            setGuardandoImagen(false); // Indicar que la imagen se ha guardado (o ha ocurrido un error)
          }
        }
      } else {
        console.error('Error al obtener la referencia de la colección');
      }
      console.log('Mensaje enviado con éxito');
      navegacion.navigate('Noticias', { screen: 'Noticias' });
    } catch (error) {
      console.error('Error al enviar datos:', error);
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
          onPress={() => onSend(titulo, asunto, text, imageUri)}
          style={{ ...styles.publicar_btn, backgroundColor: publicar ? '#00FFFF' : '#A9A9A9' }} disabled={!publicar || guardandoImagen}>
          <Text style={{ ...styles.text_botones, color: publicar ? '#000000' : '#D3D3D3' }}>
            {guardandoImagen ? 'Guardando...' : 'Publicar'}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View>
          <TextInput
            placeholder='Título'
            style={styles.titulo_asunto_input}
            value={titulo}
            onChangeText={(title) => {
              setTitulo(title);
              setPublicar(title && (imageUri || text.length > 0)); // Ajustar la condición
            }}
          />
          <TextInput
            placeholder='Asunto (opcional)'
            style={styles.titulo_asunto_input}
            value={asunto}
            onChangeText={(newAsunto) => {
              setAsunto(newAsunto);
            }}
          />
          <TextInput
            placeholder='Escribe un texto...'
            style={styles.texto_input}
            multiline={true}
            numberOfLines={4}
            value={text}
            onChangeText={(newText) => {
              onChangeText(newText);
              setPublicar(titulo && (imageUri || newText.length > 0)); // Ajustar la condición
            }}
          />
        </View>
        <View style={styles.prev_cont}>
          <View style={styles.imagen_prev}>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />}

          </View>
          <TouchableOpacity style={styles.eliminarButton} onPress={eliminarImagen}>
            <FontAwesome5 name="times-circle" size={25} color="#000" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  texto_input: {
    //height: 150,
    textAlignVertical: 'top',
    padding: 5,
    fontSize: 20,
    backgroundColor: 'red'
  },
  botones_cont: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  up_fv: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  prev_cont: {
    backgroundColor: 'white'
  },
  imagen_prev: {
    alignItems: 'center',
    //backgroundColor: 'green'
  },
  titulo_asunto_input: {
    //backgroundColor: '#FEA',
    height: 50,
    fontSize: 20
  },
  image: {
    width: 350,
    height: 400,
    marginHorizontal: 5,
  },
  buttonText: {
    marginLeft: 5,
    fontWeight:'bold'
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
    right: 0,

  },
  text_botones: {
    fontSize: 18,
    color: '#00000'
  }
});

export default Publicar;
