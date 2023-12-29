import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'

const NoticiaInfo = ({ route }) => {
    const { params } = route;
    const { asunto, autor, fecha, imagen, texto, titulo } = params.info;
    return (
        <SafeAreaView style={styles.contenedor}>
            <View style={styles.header_cont}>
                <Text style={styles.titulo_publicacion}>{titulo}</Text>
                <Text style={styles.asunto_publicacion}>{asunto}</Text>
                <Text style={styles.autor_publicacion}> Publicado por: {autor}</Text>
            </View>
            <Text style={styles.texto_publicacion}>{texto}</Text>
            {imagen !== null && (
                <Text>{imagen}</Text>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contenedor:{
        flex:1,
        backgroundColor:'white'
    },  
    header_cont:{
        flex:0.15,
        backgroundColor:'green'
    },  
    titulo_publicacion: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    asunto_publicacion: {
        fontSize: 20,
    },
    autor_publicacion: {
        marginBottom: 5,
        marginRight: 10
    },
    texto_publicacion: {
        fontSize: 18,
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
})

export default NoticiaInfo