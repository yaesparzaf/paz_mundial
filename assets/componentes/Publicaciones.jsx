import { View, Text, FlatList, StyleSheet, TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '../../fb/DatosUsers'
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../fb/firebase-config';
import { Entypo } from '@expo/vector-icons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
//import { LinearGradient } from 'expo-linear-gradient';
let nveces = 0;


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
            newPublicacion.forEach((publicacion, index) => {
                console.log(`Publicación ${index + 1}:`, publicacion);
            });
            setPublicaciones(newPublicacion);
            setLoading(false);
        });
        console.log('Suscripción establecida');
        return () => {
            subscripcion();
            console.log('Suscripción limpiada');
        }
    }, [usuario]);
    if (loading) 
        return <ActivityIndicator size="large" color="#40E0D0" style={{flex:1,alignItems:'center'}}/>;
    return (
        <FlatList
            data={publicaciones}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Post item={item} rol={usuario.rol} />}
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

const Post = ({ item, rol }) => {
    nveces = nveces + 1;
    console.log('entro: ' + nveces + 'veces');
    const fecha = item.fecha ? item.fecha.toDate() : null;
    item = { titulo: item.titulo, asunto: item.asunto, autor: item.autor, texto: item.texto };
    //console.log(item);
    console.log('rol:' + rol);
    console.log('item ingresado: ',item);

    const FormatoFecha = (fecha) => {
        if (!fecha) return '';

        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        return fecha.toLocaleDateString(undefined, options);
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
                        <TouchableOpacity activeOpacity={1.0}>
                            <Entypo name="dots-three-vertical" size={15} color="black" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <Text style={styles.titulo_publicacion}>{item.titulo}</Text>
            <Text style={styles.asunto_publicacion}>{item.asunto}</Text>
            <Text style={styles.textoPublicacion}>{item.texto}</Text>
            {item.imagen && <Image source={{ uri: item.imagen }} style={styles.imagenPublicacion} />}
        </View>
    )
}

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
    encabezado: {
        flexDirection: 'row',
        height: 30,
    },
    titulo_publicacion: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    asunto_publicacion: {
        fontSize: 18,
    },
    autorTexto: {
        marginBottom: 5,
        marginRight: 10
    },
    textoPublicacion: {
        fontSize: 15,
        textAlign: 'justify',
    },
    imagenPublicacion: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    fechaTexto: {
        fontSize: 12,
        color: '#888',
        marginTop: 2
    },
    menu_publicacion: {
        flexDirection: 'row-reverse',
        flex: 1,
        //backgroundColor:'green'
    }
});

export default Publicaciones