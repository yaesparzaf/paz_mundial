import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DatosUsers from "../componentes/DatosUsers";

const Noticias = () => {
  return (
    <SafeAreaView>
      <View>
        <DatosUsers/>
      </View>
    </SafeAreaView>
  );
};

export default Noticias;
