import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import ForosBtn from "../componentes/ForosBtn";
const windowWidth = Dimensions.get("window").width;

const Comunidad = () => {
  

  return (
    <View style={styles.contenedor}>
      <View style={styles.cont_rs}>
        <Text>Redes sociales</Text>
      </View>
      <View style={styles.cont_titulo_foros}>
        <Text style={styles.titulos}>Foros</Text>
      </View>
      <View style={styles.cont_foros}>
        <ForosBtn/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    paddingHorizontal:5,
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  cont_rs: {
    flex: 0.2,
    width: windowWidth,
    alignItems: "center",
    //backgroundColor:"#b61832",
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
  },
  cont_titulo_foros:{
    flex:0.1,
    marginTop:10,
    marginLeft:5
    
  },  
  cont_foros: {
    flex: 0.7,
    width: windowWidth,
    alignItems: "center",
    //backgroundColor: "#FFFF00",
    paddingTop: 10,
  },
  titulos: {
    fontSize: 25,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Comunidad;
