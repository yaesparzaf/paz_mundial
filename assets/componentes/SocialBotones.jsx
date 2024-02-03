import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';

const SocialBotones = (nombre) => {
    const openFacebook = async () => {
        const AppFbUrl = 'fb://page/1231272500288305';
        const WebFbUrl = 'https://www.facebook.com/1231272500288305';
        
        try {
            const isSupported = await Linking.canOpenURL(AppFbUrl);
            if (isSupported) {
                console.log(AppFbUrl);
                await Linking.openURL(AppFbUrl);
            } else {
                console.log(WebFbUrl);
                if (Platform.OS === 'ios') {
                    // Si es iOS, abrir enlace web directamente
                    await Linking.openURL(WebFbUrl);
                } else {
                    // Si es Android, también puedes abrir el enlace web
                    await Linking.openURL(WebFbUrl);
                }
            }
        } catch (error) {
            console.log('Error al abrir la aplicación: ' + error);
        }
    };
    
    const openYoutube = async () =>{
        const AppYTUrl ='vnd.youtube://channel/UCyOe-cwaxn97Wy7Wihz0hiw';
        const WebYTUrl ='https://www.youtube.com/@fundacion.despertar';
        try{
            const isSupported = await Linking.canOpenURL(AppYTUrl);
            if(isSupported){
                console.log(AppYTUrl);
                await Linking.openURL(AppYTUrl);
            }
            else
                console.log(WebYTUrl);
                await Linking.openURL(WebYTUrl);
        }catch(error){
            console.log('Error al abrir la aplicacion: '+error);
        }
    };
    return (
        <View style={styles.cont_rs}>
            {/*<Text style={styles.titulo}>Redes Sociales</Text>*/}
            <View style={styles.cont_botones}>
                <TouchableOpacity style={styles.fb_boton} onPress={openFacebook}>
                    <Entypo name="facebook" size={50} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.yt_boton} onPress={openYoutube}>
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