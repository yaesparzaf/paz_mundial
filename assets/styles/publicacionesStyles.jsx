import { StyleSheet } from "react-native";

const publicaciones = StyleSheet.create({
  publicacionContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#00000021",
    backgroundColor: "#fff",
  },
  skeletonItem: {
    marginBottom: 10,
    borderRadius: 5,
    height: 100,
    width: "100%",
  },
  noticia_btn: {
    //backgroundColor:'brown'
  },
  encabezado: {
    alignItems: "center",
    flexDirection: "row",
    height: 25,
    //backgroundColor: 'red'
  },
  titulo_publicacion: {
    fontSize: 20,
    fontWeight: "bold",
  },
  asunto_publicacion: {
    fontSize: 18,
  },
  autorTexto: {
    fontWeight: "bold",
    marginBottom: 5,
    marginRight: 10,
  },
  textoPublicacion: {
    fontSize: 15,
    textAlign: "justify",
  },
  imagenPublicacion: {
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  fechaTexto: {
    fontSize: 12,
    color: "#888",
    marginTop: 0,
  },
  menu_publicacion: {
    flexDirection: "row-reverse",
    flex: 1,
    //backgroundColor:'green'
  },
});

export default publicaciones;
