import React, { useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../../fb/firebase-config';
import { ref, getDownloadURL, getStorage, uploadBytes, deleteObject } from 'firebase/storage';
import { collection, addDoc, serverTimestamp, updateDoc, doc, getDoc, deleteDoc, FieldValue, deleteField } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../fb/DatosUsers';

const Publicar = ({ route }) => {

  const { usuario, setUsuario } = useUser();
  const [titulo, setTitulo] = React.useState();
  const [asunto, setAsunto] = useState('');
  const [text, onChangeText] = React.useState('');
  const [alignAsunto, setAlignAsunto] = useState('left');
  const [alignTexto, setAlignTexto] = useState('left');
  const [italica, setItalica] = useState(false);
  const [menuEdicion, setMenuEdicion] = useState(true);
  const [publicar, setPublicar] = useState(false);
  const [imagenUri, setImagenUri] = useState();
  const [imagenUri_prev, setImagenUri_prev] = useState();
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
        const { noticiaId } = params;
        console.log('id recibio para editar:', noticiaId);
        setNoticiaId(noticiaId);
        if (noticiaId) {
          const noticiaRef = collection(db, 'noticias');
          const noticiaEdit = await getDoc(doc(noticiaRef, noticiaId));
          if (noticiaEdit.exists()) {
            const datos_noticia = noticiaEdit.data();
            setTitulo(datos_noticia.titulo);
            setAlignAsunto(datos_noticia.align_asunto);
            setAlignTexto(datos_noticia.align_texto);
            setAsunto(datos_noticia.asunto);
            onChangeText(datos_noticia.texto);
            setImagenUri(datos_noticia.imagen);
            setItalica(datos_noticia.tipo_letra === 'italic');
            setEditar(!editar);
          } else { console.log('no hay datos para mostrar ' + noticiaId); }
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
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.6,
      });

      if (!result.canceled) {
        const selectedAsset = result.assets && result.assets.length > 0 ? result.assets[0] : null;
        setesImagen(selectedAsset?.type.startsWith('image'));
        //setesVideo(selectedAsset?.type.startsWith('video'));
        if (editar && !imagenUri_prev)
          setImagenUri_prev(imagenUri);
        setImagenUri(selectedAsset ? selectedAsset.uri : null);
        setPublicar(titulo && (selectedAsset || text.length > 0));
      }
    } catch (error) {
      console.error('Error al abrir la galería: ', error);
    }
  };

  const subirImagen = async (coleccionRef, imagenUri) => {
    const storage = getStorage();
    const extension = imagenUri.split('.').pop();
    const storageRef = ref(storage, `uploads/noticias/imagenes/${coleccionRef.id}.${extension}`);
    try {
      setGuardandoImagen(true);
      const response = await fetch(imagenUri);
      const blob = await response.blob();
      const snapshot = await uploadBytes(storageRef, blob);
      const imageUrl = await getDownloadURL(snapshot.ref);
      await updateDoc(coleccionRef, { imagen: imageUrl });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setGuardandoImagen(false);
    }
  };

  const eliminarImagen = () => {
    if (editar) { setImagenUri_prev(imagenUri); }
    setImagenUri(null);
    setPublicar(titulo && titulo.length > 0);
  };

  const keyboardHide = () => {
    setMenuEdicion(false);
  };
  /*const onAlignTexto = (tipo, input) => {
    if (input === 'A') {
      setAlignAsunto(tipo);
    } else if (input === 'T') {
      setAlignTexto(tipo);
    }
  };*/

  const onSend = async (titulo, asunto, alignAsunto, alignTexto, text, imagenUri) => {
    try {
      const coleccionRef = await addDoc(collection(db, 'noticias'), {
        titulo: titulo,
        asunto: asunto,
        align_asunto: alignAsunto,
        align_texto: alignTexto,
        autor: usuario.nombre,
        autor_id: usuario.id,
        fecha: serverTimestamp(),
        leida: false,
        tipo_letra: italica ? 'italic' : 'normal',
        texto: text,
      });
      //console.log(coleccionRef.id);
      if (coleccionRef) {
        if (imagenUri) {
          const imagenSubida = await subirImagen(coleccionRef, imagenUri);
          if (!imagenSubida) {
            await deleteDoc(coleccionRef);
          }
        }
        //const noticiasLeidasRef = await getDoc(collection(db,'usuarios',usuario.))
      } else {
        console.error('Error al obtener la referencia del nuevo documento');
      }
      //NoticiaNueva(usuario.id,coleccionRef.id);
      navegacion.navigate('Noticias', { screen: 'Noticias' });
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };

  //arreglar: si elimino la imagen en modo edicion y hago post sin imagen nueva, se mantiene la imagen inicial.
  const onSendEdit = async (noticiaId, new_titulo, new_asunto, alignAsunto, alignTexto, new_texto, new_imagen, prev_imagen) => {
    const noticiaRef = doc(db, 'noticias', noticiaId);
    try {
      console.log('imagen previa: ',prev_imagen);
      console.log('nueva imagen: ', new_imagen);
      if (prev_imagen && new_imagen) {
        await updateDoc(noticiaRef, {
          align_asunto: alignAsunto,
          align_texto: alignTexto,
          asunto: new_asunto,
          imagen: new_imagen,
          titulo: new_titulo,
          texto: new_texto,
          tipo_letra: italica ? 'italic' : 'normal',
        });
        const storage = getStorage();
        const imagenRef = ref(storage, prev_imagen);
        subirImagen(noticiaRef, new_imagen);
        console.log('imagen actualizada');
        try {
          await deleteObject(imagenRef);
          console.log('imagen eliminada!');
        } catch (error) {
          console.log('no se pudo eliminar la imagen ' + error);
        }
      } else if (prev_imagen && !new_imagen) {
        console.log('entra a if sin imagen nueva');
        await updateDoc(noticiaRef, {
          align_asunto: alignAsunto,
          align_texto: alignTexto,
          asunto: new_asunto,
          imagen:deleteField(),
          titulo: new_titulo,
          texto: new_texto,
          tipo_letra: italica ? 'italic' : 'normal',
        });
        const storage = getStorage();
        const imagenRef = ref(storage, prev_imagen);
        try {
          await deleteObject(imagenRef);
          console.log('imagen eliminada!');
        } catch (error) {
          console.log('no se pudo eliminar la imagen ' + error);
        }

      } else {
        await updateDoc(noticiaRef, {
          align_asunto: alignAsunto,
          align_texto: alignTexto,
          titulo: new_titulo,
          asunto: new_asunto,
          texto: new_texto,
          tipo_letra: italica ? 'italic' : 'normal',
        });
      }
      console.log('noticia editada con exito.');
      navegacion.navigate('Noticias', { screen: 'Noticias' });
    } catch (error) {
      console.log('hubo un erro al actualizar los datos: ' + error);
    }

  };

  const MenuEdicion = (input) => {
    if (input === 'A') {
      return (
        <View style={styles.row}>
          <TouchableOpacity style={styles.align_Text} onPress={() => { setItalica(!italica); }} >
            <Feather name="italic" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.align_Text} onPress={() => { setAlignAsunto('left'); }}>
            <Feather name="align-left" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.align_Text} onPress={() => { setAlignAsunto('center'); }}>
            <Feather name="align-center" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.align_Text} onPress={() => { setAlignAsunto('right'); }}>
            <Feather name="align-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
      );
    } else if (input === 'T') {
      return (
        <View style={styles.row}>
          <TouchableOpacity style={styles.align_Text} onPress={() => { setAlignTexto('left'); }}>
            <Feather name="align-left" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.align_Text} onPress={() => { setAlignTexto('center'); }}>
            <Feather name="align-center" size={24} color="black" />
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <View style={styles.botones_cont}>
          <TouchableOpacity style={styles.up_fv} onPress={abrirGaleria}>
            <FontAwesome5 name="photo-video" size={24} color="black" />
            <Text style={styles.buttonText}>Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => (editar ? onSendEdit(noticiaId, titulo, asunto, alignAsunto, alignTexto, text, imagenUri, imagenUri_prev) : onSend(titulo, asunto, alignAsunto, alignTexto, text, imagenUri))}
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
              setPublicar(title && (imagenUri || title.length > 0));
            }}
          />
          {menuEdicion && (
            MenuEdicion('A')
          )}
          <TextInput
            placeholder='Asunto (opcional)'
            style={[styles.titulo_asunto_input, {
              textAlign: alignAsunto,
              fontStyle: italica ? 'italic' : 'normal'
            }]}
            value={asunto}
            //al enviar la publicacion, hay que enviar que tipo de letra se eligio.
            onChangeText={(newAsunto) => {
              if (editar) { setPublicar(newAsunto && (newAsunto.length > 0)); }
              setAsunto(newAsunto);
            }}
          />
          {menuEdicion && (
            MenuEdicion('T')
          )}
          <TextInput
            placeholder='Escribe un texto...'
            style={[styles.texto_input, { textAlign: alignTexto }]}
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
          {imagenUri ? (
            <View style={styles.prev_cont}>
              <TouchableOpacity style={styles.eliminarButton} onPress={eliminarImagen}>
                <FontAwesome5 name="times-circle" size={25} color="#000" />
              </TouchableOpacity>
              {(esImagen || editar) && (
                <Image source={{ uri: imagenUri }} style={styles.image} />
              )}
              {esVideo && (
                <Video
                  source={{ uri: imagenUri }}
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
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginRight: 5
  },
  menu_edicion: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',

  },
  align_Text: {
    marginRight: 5,
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
    width: '100%',
    height: 500,
    resizeMode: "contain",
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
    alignItems: 'flex-end',
    //position: 'absolute',
    width: 25,
    flexDirection: 'row-reverse',
    right: 0,
    backgroundColor: '#D3D3D3'
  },
  text_botones: {
    fontSize: 18,
    color: '#00000'
  }
});

export default Publicar;
