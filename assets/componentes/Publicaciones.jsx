    import { View, Text, FlatList, StyleSheet } from 'react-native'
    import React, { useEffect, useState } from 'react'
    import { useUser } from '../../fb/DatosUsers'
    import { collection, onSnapshot, query } from 'firebase/firestore';
    import { db } from '../../fb/firebase-config';

    const Publicaciones = () => {
        const { usuario } = useUser();
        const [publicaciones, setPublicaciones] = useState([]);

        useEffect(() => {
            const q = query(collection(db, 'noticias'));
            const subscripcion = onSnapshot(q, (snapshot) => {
                const newPublicacion = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                newPublicacion.sort((a,b) => b.fecha -a.fecha);
                setPublicaciones(newPublicacion);
            });
            return () => {
                subscripcion();
            }
        }, [usuario]);
        return (
            <FlatList
                data={publicaciones}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) =>
                    <Post item={item} />
                }
            >
            </FlatList>
        )
    }

    const Post = ({ item }) => {
        const fecha = item.fecha ? item.fecha.toDate() :null;
        item = { autor: item.autor, texto: item.texto };
        console.log(item);
        return (
            <View style={styles.publicacionContainer}>
                <View style={{flexDirection:'row',}}>
                    <Text style={styles.autorTexto}>{item.autor}</Text>
                    {fecha !== null &&(
                        <Text style={styles.fechaTexto}>{fecha.toLocaleString()}</Text>

                    )}
                </View>
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
        autorTexto: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 5,
            marginRight:10
        },
        textoPublicacion: {
            fontSize: 14,
            alignItems:'flex-end',
            color: 'black'
        },
        imagenPublicacion: {
            width: '100%',
            height: 200, // ajusta la altura según tus necesidades
            resizeMode: 'cover',
            marginBottom: 10,
        },
        fechaTexto: {
            fontSize: 12,
            color: '#888',
            marginTop:5
        },
    });

    export default Publicaciones