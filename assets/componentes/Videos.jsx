import { View, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Ubicacion from '../componentes/Ubicacion'
import VideoYT from './VideoYT'
import FloatButton from './FloatButton'
import { useUser } from '../../fb/DatosUsers'

const Videos = () => {
    const {usuario} =useUser();
    const [ubicacion, setUbicacion] = useState(null);
    const [loading, setLoading] = useState(true)
    const obtenerUbicacion = async (ubicacion) => {
        setUbicacion(ubicacion);
        if (ubicacion)
            setLoading(false);
    };
    return (
        <View style={{flex:1}}>
            <Ubicacion getLocation={obtenerUbicacion} />
            {loading ? (
                <ActivityIndicator size="large" color="#40E0D0" style={{ flex: 1, alignItems: 'center' }} />
            ) : (
                ubicacion && (
                    <View style={{ flex: 1 }}>
                        <VideoYT />
                    </View>
                )
            )}
            {usuario && usuario.rol === 'admin' && <FloatButton pantalla="V"/>}
        </View>
    )
}

export default Videos