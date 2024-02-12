import React, { useState, useEffect } from "react";
import { Text, View, Animated } from "react-native";

const ContadorAnimado = ({ numero }) => {
  const [contadorAnimado] = useState(new Animated.Value(0));
  const [contador, setContador] = useState(0);

  useEffect(() => {
    Animated.timing(contadorAnimado, {
      toValue: numero,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, [contadorAnimado, numero]);

  contadorAnimado.addListener((value) => {
    setContador(Math.floor(value.value));
  });

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "#56A5B2" }}>
        {contador}
      </Text>
    </View>
  );
};

export default ContadorAnimado;
