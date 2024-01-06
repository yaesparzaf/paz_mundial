import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '../../fb/DatosUsers'
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../fb/firebase-config';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import OpcionesUD from './OpcionesUD';
//import { LinearGradient } from 'expo-linear-gradient';


const Publicaciones = () => {
  const { usuario } = useUser();
  const [loading, setLoading] = useState(true);
  const [publicaciones, setPublicaciones] = useState([]);
  useEffect(() => {
    const q = query(collection(db, 'noticias'));
    const subscripcion = onSnapshot(q, (snapshot) => {
      const newPublicacion = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      newPublicacion.sort((a, b) => b.fecha - a.fecha);
      setPublicaciones(newPublicacion);
      setLoading(false);
      //console.log(newPublicacion);
    });
    return () => {
      subscripcion();
      console.log('Suscripción limpiada');
    }
  }, [usuario]);
  if (loading)
    return <ActivityIndicator size="large" color="#40E0D0" style={{ flex: 1, alignItems: 'center' }} />;
  return (
    <FlatList
      data={publicaciones}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Info item={item} rol={usuario.rol}
      //style={{alignItems:'flex-start'}}
      />}
    /*ListEmptyComponent={() => (
        <SkeletonPlaceholder>
            {[1, 2, 3].map((index) => (
                <View key={index} style={styles.skeletonItem} />
            ))}
        </SkeletonPlaceholder>
    )}*/
    />
  )
}

const Info = ({ item, rol }) => {
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const navegacion = useNavigation();
  const fecha = item.fecha ? item.fecha.toDate() : null;
  //item = { id: item.id, titulo: item.titulo, asunto: item.asunto, autor: item.autor, imagen: item.imagen, texto: item.texto };
  //console.log(item);
  const FormatoFecha = (fecha) => {
    if (!fecha) return '';
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return fecha.toLocaleDateString(undefined, options);
  };

  const pressButton = (info) => {
    navegacion.navigate('NoticiaInfo', { info });
  };

  const toggleOpciones = () => {
    setMostrarOpciones(!mostrarOpciones);
  };

  return (
    <View style={styles.publicacionContainer}>
      <View style={styles.encabezado}>
        <Text style={styles.autorTexto}>{item.autor}</Text>
        {fecha !== null && (
          <Text style={styles.fechaTexto}>{FormatoFecha(fecha)}</Text>
        )}
        <View style={styles.menu_publicacion}>
          {rol === 'admin' && (
            <TouchableOpacity activeOpacity={1.0} onPress={toggleOpciones}>
              <Entypo name="dots-three-vertical" size={18} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <TouchableOpacity style={styles.noticia_btn} onPress={() => pressButton(item)}>
        <Text style={styles.titulo_publicacion}>{item.titulo}</Text>
        <Text style={styles.asunto_publicacion}>{item.asunto}</Text>
        {item.imagen &&
          <FontAwesome name="photo" size={18} color="black" />
          //<Image source={{ uri: item.imagen }} style={styles.imagenPublicacion} 
        }
      </TouchableOpacity>
      {mostrarOpciones && (
        <OpcionesUD
          onClose={toggleOpciones}
          noticiaId={item.id}
          imagenUrl={item.imagen}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  publicacionContainer: {
    //height:500,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white'
  },
  skeletonItem: {
    marginBottom: 10,
    borderRadius: 5,
    height: 100,
    width: '100%',
  },
  noticia_btn: {
    //backgroundColor:'brown'
  },
  encabezado: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 25,
    //backgroundColor: 'red'
  },
  titulo_publicacion: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  asunto_publicacion: {
    fontSize: 18,
  },
  autorTexto: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginRight: 10
  },
  textoPublicacion: {
    fontSize: 15,
    textAlign: 'justify',
  },
  imagenPublicacion: {
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  fechaTexto: {
    fontSize: 12,
    color: '#888',
    marginTop:0
  },
  menu_publicacion: {
    flexDirection: 'row-reverse',
    flex: 1,
    //backgroundColor:'green'
  }
});

export default Publicaciones