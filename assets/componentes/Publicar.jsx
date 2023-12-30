import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { db, storage } from '../../fb/firebase-config';
import { ref, uploadString, getDownloadURL, getStorage, uploadBytes } from 'firebase/storage';
import { collection, addDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../fb/DatosUsers';

const Publicar = () => {
  const { usuario, setUsuario } = useUser();
  const [titulo, setTitulo] = React.useState();
  const [asunto, setAsunto] = useState('');
  const [text, onChangeText] = React.useState('');
  const [title, onChangeTitle] = React.useState('');
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
            // Convertir la imagen a un blob
            const response = await fetch(imageUri);
            const blob = await response.blob();

            // Subir el blob a Firebase Storage
            const snapshot = await uploadBytes(storageRef, blob);

            // Obtener la URL de descarga de la imagen
            const imageUrl = await getDownloadURL(snapshot.ref);

            // Actualizar el documento con la URL de la imagen
            await updateDoc(coleccionRef, { imagen: imageUrl });

            console.log('Imagen subida con éxito');
          } catch (error) {
            console.error(error);
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
          style={{ ...styles.publicar_btn, backgroundColor: publicar ? '#00FFFF' : '#A9A9A9' }} disabled={!publicar}>
          <Text style={{ ...styles.text_botones, color: publicar ? '#000000' : '#D3D3D3' }}>Publicar</Text>
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
              setPublicar(title.length > 0);

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
            style={styles.input}
            value={text}
            onChangeText={(newText) => {
              onChangeText(newText);
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
  titulo_asunto_input: {
    backgroundColor: '#FEA',
    height: 50,
    fontSize: 20
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
