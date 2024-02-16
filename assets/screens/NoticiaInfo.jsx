import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

const NoticiaInfo = ({ route }) => {
  const { params } = route;
  console.log(params.info);
  const {
    align_asunto,
    align_texto,
    asunto,
    autor,
    fecha,
    imagen,
    texto,
    tipo_letra,
    titulo,
  } = params?.info || {};
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.postContainer}>
          <View style={styles.header}>
            <Text style={styles.author}>{autor}</Text>
            <Text style={styles.date}>
              {fecha && fecha.toDate().toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{titulo}</Text>
            <Text
              style={[
                styles.subject,
                { textAlign: align_asunto, fontStyle: tipo_letra },
              ]}
            >
              {asunto}
            </Text>
            <Text
              style={[
                styles.text,
                { textAlign: align_texto, fontStyle: tipo_letra },
              ]}
            >
              {texto}
            </Text>
            {imagen && <Image source={{ uri: imagen }} style={styles.image} />}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  postContainer: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  content: {},
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subject: {
    fontSize: 16,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 400,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default NoticiaInfo;
