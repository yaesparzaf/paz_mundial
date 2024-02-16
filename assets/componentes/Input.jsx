import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Input = () => {
  const [text, setText] = useState("");

  const handleSend = () => {
    // Lógica para enviar el texto
    console.log("Texto enviado:", text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline={true}
        placeholder="Escribe aquí..."
        onChangeText={(value) => setText(value)}
        value={text}
        numberOfLines={4}
        maxHeight={80}
        minHeight={40}
      />
      <View>
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 8,
    backgroundColor:"#ffffff",
  },
  input: {
    flex: 1,
    minHeight: 40,
    fontSize: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 8,
  },
});

export default Input;
