import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';

const SocialBotones = () => {
    return (
        <View style={styles.cont_rs}>
            {/*<Text style={styles.titulo}>Redes Sociales</Text>*/}
            <View style={styles.cont_botones}>
                <TouchableOpacity style={styles.fb_boton}>
                    <Entypo name="facebook" size={50} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.yt_boton}>
                    <Entypo name="youtube" size={50} color="red" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cont_rs: {
        flex: 0.2,
        width: '100%',
        alignItems: 'center',
        //backgroundColor:"#b61832",
        borderBottomWidth: 1,
        borderBottomColor: "#D3D3D3",
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    cont_botones: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        width: '100%',
        height:100,
        justifyContent: 'space-around',
       // backgroundColor:'yellow'
    },
    fb_boton: {
        width:'30%',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor:'green'
    },
    yt_boton: {
        width:'30%',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default SocialBotones