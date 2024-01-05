import { View, Text, SafeAreaView, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'

const NoticiaInfo = ({ route }) => {
    const { params } = route;
    const { asunto, autor, fecha, imagen, texto, titulo } = params?.info || {};
    return (
        <SafeAreaView style={styles.contenedor}>
            <ScrollView>
                <View style={styles.header_cont}>
                    <Text style={styles.autor_publicacion}>{autor}</Text>
                    
                </View>
                <View style={styles.info_cont}>
                    <Text style={styles.titulo_publicacion}>{titulo}</Text>
                    <Text style={styles.asunto_publicacion}>{asunto}</Text>
                </View>
                <View style={styles.texto_cont}>
                    <Text style={styles.texto_publicacion}>{texto}</Text>
                </View>
                {imagen !== null && (
                    <View style={styles.imagen_cont}>
                        <Image source={{ uri: imagen }} style={styles.imagenPublicacion} />
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: 'white'
    },
    header_cont: {
        margin: 5,
        flexDirection: 'row',
        marginHorizontal: 15,
        //backgroundColor:'green'
    },
    titulo_publicacion: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    asunto_publicacion: {
        fontSize: 18,
    },
    autor_publicacion: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
        marginRight: 10
    },
    texto_publicacion: {
        fontSize: 16,
        textAlign: 'justify',
    },
    info_cont: {
        margin: 5,
        marginHorizontal: 15,
    },
    texto_cont: {
        marginHorizontal: 10,
        marginHorizontal: 25,
    },
    imagen_cont: {
        alignItems: 'center'
    },
    imagenPublicacion: {
        width: '90%',
        height: 500,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    fechaTexto: {
        fontSize: 12,
        color: '#888',
        marginTop: 2
    },
})

export default NoticiaInfo