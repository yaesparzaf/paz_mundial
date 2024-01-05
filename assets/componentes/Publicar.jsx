import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../../fb/firebase-config';
import { ref, getDownloadURL, getStorage, uploadBytes } from 'firebase/storage';
import { collection, addDoc, serverTimestamp, updateDoc, doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../fb/DatosUsers';

const Publicar = ({ route }) => {

  const { usuario, setUsuario } = useUser();
  const [titulo, setTitulo] = React.useState();
  const [asunto, setAsunto] = useState('');
  const [text, onChangeText] = React.useState('');
  const [publicar, setPublicar] = useState(false);
  const [imageUri, setImageUri] = useState();
  const [guardandoImagen, setGuardandoImagen] = useState(false);
  const navegacion = useNavigation();
  const [esImagen, setesImagen] = useState();
  const [esVideo, setesVideo] = useState();
  const [editar, setEditar] = useState(false);
  const [noticiaId, setNoticiaId] = useState();

  useEffect(() => {
    const obtenerDatos = async () => {
      const { params } = route;
      if (params) {
        const { itemId } = params;
        setNoticiaId(itemId);
        if (itemId) {
          const noticiaRef = collection(db, 'noticias');
          const noticiaEdit = await getDoc(doc(noticiaRef, itemId));
          //console.log(noticiaEdit);
          if (noticiaEdit.exists()) {
            const datos_noticia = noticiaEdit.data();
            setTitulo(datos_noticia.titulo);
            setAsunto(datos_noticia.asunto);
            onChangeText(datos_noticia.texto);
            setImageUri(datos_noticia.imagen);
            //console.log(datos_noticia.titulo)
            //console.log(datos_noticia.asunto);
            //console.log(datos_noticia.imagen);
            console.log(imageUri);
            //setesImagen(!esImagen);
            setEditar(!editar);
          } else { console.log('no hay datos para mostrar ' + itemId); }
        }
      }
    };
    obtenerDatos();
  }, []);

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
        quality: 0.6,
      });

      if (!result.canceled) {
        const selectedAsset = result.assets && result.assets.length > 0 ? result.assets[0] : null;
        setesImagen(selectedAsset?.type.startsWith('image'));
        setesVideo(selectedAsset?.type.startsWith('video'));
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
        if (imageUri) {
          const storage = getStorage();
          const extension = imageUri.split('.').pop();
          const storageRef = ref(storage, `uploads/noticias/imagenes/${coleccionRef.id}.${extension}`);
          try {
            setGuardandoImagen(true);
            const response = await fetch(imageUri);
            const blob = await response.blob();
            const snapshot = await uploadBytes(storageRef, blob);
            const imageUrl = await getDownloadURL(snapshot.ref);
            await updateDoc(coleccionRef, { imagen: imageUrl });
          } catch (error) {
            console.error(error);
          } finally {
            setGuardandoImagen(false);
          }
        }
      } else {
        console.error('Error al obtener la referencia de la colección');
      }
      navegacion.navigate('Noticias', { screen: 'Noticias' });
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };

  const onSendEdit = async (noticiaId, new_titulo, new_asunto, new_texto) => {
    console.log('doc a editar: ', noticiaId);
    const noticiaRef = doc(db, 'noticias', noticiaId);
    try {
      await updateDoc(noticiaRef, {
        titulo: new_titulo,
        asunto: new_asunto,
        texto: new_texto,
        //imagen: new_imagen,
      });
      //if(ant_imagen){

      //}
      console.log('noticia editada con exito.');
      navegacion.navigate('Noticias', { screen: 'Noticias' });
    } catch (error) {
      console.log('hubo un erro al actualizar los datos: ' + error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <View style={styles.botones_cont}>
          <TouchableOpacity style={styles.up_fv} onPress={abrirGaleria}>
            <FontAwesome5 name="photo-video" size={24} color="black" />
            <Text style={styles.buttonText}>Foto/Video</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>(editar ? onSendEdit(noticiaId, titulo, asunto, text) : onSend(titulo, asunto, text, imageUri))}
            style={{ ...styles.publicar_btn, backgroundColor: publicar ? '#00FFFF' : '#A9A9A9' }} disabled={!publicar || guardandoImagen}>
            <Text style={{ ...styles.text_botones, color: publicar ? '#000000' : '#D3D3D3' }}>
              {guardandoImagen ? 'Publicando...' : 'Publicar'}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TextInput
            placeholder='Título'
            style={styles.titulo_asunto_input}
            value={titulo}
            onChangeText={(title) => {
              setTitulo(title);
              setPublicar(title && (imageUri || title.length > 0));
            }}
          />
          <TextInput
            placeholder='Asunto (opcional)'
            style={styles.titulo_asunto_input}
            value={asunto}
            onChangeText={(newAsunto) => {
              if (editar) { setPublicar(newAsunto && (newAsunto.length > 0)); }
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
              if (editar) { setPublicar(newText && (newText.length > 0)); }
              onChangeText(newText);
            }}
          />
        </View>
        <View style={styles.prev_cont}>
          {imageUri ? (
            <View style={styles.prev_cont}>
              <TouchableOpacity style={styles.eliminarButton} onPress={eliminarImagen}>
                <FontAwesome5 name="times-circle" size={25} color="#000" />
              </TouchableOpacity>{console.log(' esImagen: ' + esImagen + ' editar: ' + editar)}
              {esImagen || editar && (
                <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
              )}
              {esVideo && (
                <Video
                  source={{ uri: imageUri }}
                  style={styles.video}
                  controls={true}
                  resizeMode="cover"
                />
              )}
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  texto_input: {
    textAlignVertical: 'top',
    fontSize: 20,
    //backgroundColor: 'red'
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
    marginTop: 20,
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
    width: 400,
    height: 500,
    marginHorizontal: 5,
  },
  buttonText: {
    marginLeft: 5,
    fontWeight: 'bold'
  },
  publicar_btn: {
    width: '30%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  eliminarButton: {
    alignItems: 'flex-start',
    //position: 'absolute',
    flexDirection: 'row-reverse',
    right: 0,
  },
  text_botones: {
    fontSize: 18,
    color: '#00000'
  }
});

export default Publicar;
