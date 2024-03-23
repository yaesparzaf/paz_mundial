import { StyleSheet } from "react-native";

const publicaciones = StyleSheet.create({
  publicacionContainer: {
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#fff",
    height: 125,
  },
  eliminar: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ef0000",
    width: 50,
  },
  editar: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eeeeee", // Color para el botón "Editar"
    width: 50,
  },
  candado: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    zIndex: 1,
  },
  separador: {
    alignSelf: "center",
    width: "90%",
    borderBottomWidth: 1,
    borderBottomColor: "#d1d1d1b7",
    marginVertical: 15,
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
    paddingHorizontal: "5%",
    alignItems: "center",
    flexDirection: "row",
    height: 30,
  },
  titulo_publicacion: {
    paddingHorizontal: "5%",
    fontSize: 15,
    fontWeight: "700",
    marginVertical: "30",
  },
  asunto_publicacion: {
    fontSize: 14,
    paddingHorizontal: "5%",
  },
  autorTexto: {
    fontWeight: "900",
    marginBottom: 2,
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
