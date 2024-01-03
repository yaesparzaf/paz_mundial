import { View, Text, Modal, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const OpcionesUD = ({ onClose }) => {
    const accion = () => {
        console.log('botón presionado');
        onClose();
    };

    const pressOverlay = () => {
        onClose();
    }
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={true}
        >
            <TouchableWithoutFeedback onPress={pressOverlay}>
                <View style={styles.overlay} />
            </TouchableWithoutFeedback>
            <View style={styles.modalContent}>
                <TouchableOpacity style={styles.acciones_btn} onPress={accion}>
                    <Text style={styles.acciones_texto}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.acciones_btn}>
                    <Text style={{...styles.acciones_texto, color:'red'}}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        //backgroundColor: 'rgba(0, 0, 0, 0.2)', 
    },
    modalContent: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        backgroundColor: 'white',
    },
    acciones_btn: {        
        justifyContent: 'center',
        width: '100%',
        height: 50,
        borderBottomWidth: 1,
        borderColor: 'black',
        //backgroundColor: 'red',
    },
    acciones_texto: {
        fontSize: 20,
        textAlign: 'center'
    }
});

export default OpcionesUD;
