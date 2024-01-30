import {
  View,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "../../fb/DatosUsers";
import FloatButton from "../componentes/FloatButton";
import Videos, { notLoading } from "../componentes/Videos";
import Map from "../componentes/Map";

const Meditar = () => {
  const { usuario } = useUser();
  //const [isLoading, setIsLoading] = useState(false);

 // console.log("loading afuera ", isLoading);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "blue" }}>
      {/* {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#40E0D0"
          style={{ flex: 1, alignItems: "center" }}
        />
      ) : ( */}
        <ScrollView>
          <View style={{ flex: 0.5, backgroundColor: "red" }}>
            <Videos />
          </View>
          <View>
            <Map />
          </View>
        </ScrollView> 
      {/* )} */}
      {usuario && usuario.rol === "admin" && <FloatButton pantalla="V" />}
    </SafeAreaView>
  );
};

export default Meditar;
