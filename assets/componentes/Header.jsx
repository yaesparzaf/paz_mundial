import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View style={{ paddingTop: Platform.OS === "android" && 35 }}>
      <Text style={styles.text}>Por la Paz Mundial</Text>
    </View>
  );
};

export const styles = StyleSheet.create({
    text: {
        textAlign:'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor:'white'
      },
})

export default Header;
