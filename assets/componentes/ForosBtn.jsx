import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import SocialBotones from "./SocialBotones";
import { BlurView } from "expo-blur";

const ForosBtn = () => {
  const foros = ["PoderMental", "Hipnosis"];
  const navigation = useNavigation();
  const intensidad = 50;
  const botonPresionado = (name_foro) => {
    // Acción al presionar el botón "Foro 1"
    navigation.navigate("Foro", { name_foro });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require("../meditar.jpg")}
        style={styles.drawerBackground}
      >
        <View style={{ margin: "2%" }}></View>
        <BlurView intensity={intensidad}>
          <View style={styles.blur}>
            <TouchableOpacity onPress={() => botonPresionado(foros[0])}>
              <View style={styles.item}>
                <Text style={styles.itemText}>Poder mental</Text>
              </View>
              <View style={styles.subItem}>
                <Text style={styles.itemSubText}>
                  Explora el fascinante mundo de los poderes mentales en nuestro
                  foro. Desde telepatía hasta telequinesis, únete a la discusión
                  sobre las habilidades mentales extraordinarias.
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </BlurView>
        <View style={{ margin: "2%" }}></View>
        <BlurView intensity={intensidad}>
          <View style={styles.blur}>
            <TouchableOpacity onPress={() => botonPresionado(foros[0])}>
              <View style={styles.item}>
                <Text style={styles.itemText}>Hipnosis</Text>
              </View>
              <View style={styles.subItem}>
                <Text style={styles.itemSubText}>
                  Explora el poderoso mundo de la hipnosis, desde sus antiguas
                  raíces hasta su aplicación contemporánea. Sumérgete en
                  técnicas, debates y experiencias compartidas mientras
                  descubres cómo la hipnosis puede influir en la mente y el
                  comportamiento humanos.
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </BlurView>
        <View style={{ margin: "2%" }}></View>
        <BlurView intensity={intensidad}>
          <View style={styles.blur}>
            <TouchableOpacity onPress={() => botonPresionado(foros[0])}>
              <View style={styles.item}>
                <Text style={styles.itemText}>ExploraTuMente</Text>
              </View>
              <View style={styles.subItem}>
                <Text style={styles.itemSubText}>
                  Encontrarás un espacio para explorar diversas técnicas y
                  prácticas destinadas a expandir la mente y potenciar el
                  desarrollo personal. Desde la meditación hasta la
                  visualización creativa, desde la neurociencia hasta la
                  psicología del comportamiento, nuestro objetivo es
                  proporcionarte herramientas y recursos para que puedas
                  explorar y fortalecer tu mente de formas nuevas y
                  emocionantes.
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </BlurView>
        <View style={{ margin: "2%" }}></View>
        <BlurView intensity={intensidad}>
          <View style={styles.blur}>
            <TouchableOpacity onPress={() => botonPresionado(foros[0])}>
              <View style={styles.item}>
                <Text style={styles.itemText}>ExploraTuMente</Text>
              </View>
              <View style={styles.subItem}>
                <Text style={styles.itemSubText}>
                  Encontrarás un espacio para explorar diversas técnicas y
                  prácticas destinadas a expandir la mente y potenciar el
                  desarrollo personal. Desde la meditación hasta la
                  visualización creativa, desde la neurociencia hasta la
                  psicología del comportamiento, nuestro objetivo es
                  proporcionarte herramientas y recursos para que puedas
                  explorar y fortalecer tu mente de formas nuevas y
                  emocionantes.
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </BlurView>
        <View style={{ margin: "2%" }}></View>
        <SocialBotones />
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    alignItems: "center",
    padding: 5,
  },
  subItem: {
    padding: 5, // Ajusta el espacio del subtítulo respecto al título
  },
  itemText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "uppercase", // Convertir texto a mayúsculas
  },
  itemSubText: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#f1f1f1",
  },
  blur: {
    height: "auto",
    borderColor: "#fff",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    width: 340,
    borderRadius: 15,
  },
  drawerBackground: {
    width: "100%",
    height: "auto",
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ForosBtn;
