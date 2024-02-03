import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../fb/firebase-config";
const earth = require("../tierra.jpg");
import Map from "../componentes/Map";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  /*const onLogin = () => {
        if (email !== "" && password !== "") {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => console.log("inicio de sesión exitoso"))
                .catch((err) => console.log("login error " + err.message));

        }
    }*/
  return (
    <ScrollView>
      <View style={styles.login}>
        <View>
          <Map />
        </View>
        <View style={styles.cont_leyenda}>
          <Text style={styles.leyenda}>
            Medita, entrénate, únete a nuestra comunidad.
          </Text>
        </View>
        <SafeAreaView style={styles.cont_input}>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu email"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
            autoFocus={true}
            value={email}
            onChangeText={(text) => setEmail(text)}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
            autoFocus={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          ></TextInput>
          <TouchableOpacity
            style={{
              height: 50,
              width: 300,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
              backgroundColor: "cyan",
            }}
            onPress={console.log("se presiono un boton")}
          >
            <Text style={{ fontSize: 20 }}>ingresar</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
  },
  cont_tierra: {
    alignItems: "center",
    justifyContent: "start",
    backgroundColor: "Black",
  },
  gif: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    //backgroundColor: 'blue',
  },
  cont_leyenda: {
    alignItems: "center",
    justifyContent: "center",
    //width:400,
    backgroundColor: "green",
  },
  cont_input: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    height: 50,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },
  cont_btn: {
    flex: 0.2,
    //backgroundColor:'red'
  },
  continua_btn: {
    alignItems: "center",
    justifyContent: "center",
    width: 350,
    height: 50,
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: "#40E0D0",
  },
  texto_centrado: {
    fontSize: 20,
  },
  leyenda: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default Login;
