import React, {
  useContext,
  useEffect,
  useState,
  useLayoutEffect,
  createContext,
} from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase-config";
//import { AuthenticatedUserContex } from '../navegacion/MainStack';

const AuthenticatedUserContex = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  return (
    <AuthenticatedUserContex.Provider value={{ usuario, setUsuario }}>
      {children}
    </AuthenticatedUserContex.Provider>
  );
};

const useUser = () => {
  const context = useContext(AuthenticatedUserContex);
  if (!context) {
    throw new Error("useUser debe ser utilizado dentro de un UserProvider");
  }
  return context;
};
export { AuthenticatedUserProvider, useUser };

export function DatosUsers() {
  const { usuario, setUsuario } = useUser({});

  useLayoutEffect(() => {
    async function fetchUser(nombre, email) {
      const usuariosRef = collection(db, "usuarios");
      const q = query(
        usuariosRef,
        where("nombre", "==", nombre),
        where("email", "==", email)
      );
      const querySnapShot = await getDocs(q);
      if (querySnapShot.docs.length > 0) {
        const userData = {
          id: querySnapShot.docs[0].id,
          ...querySnapShot.docs[0].data(),
        };
        setUsuario(null);
        setUsuario(userData);
        return true;
      } else {
        return false;
      }
    }
    //const usernameABuscar = 'brian';
    //const correoABuscar = 'yamil@fundaciondespertar.com';
    const usernameABuscar = "Marco";
    const correoABuscar = "123@456.com";
    fetchUser(usernameABuscar, correoABuscar);
  }, [setUsuario]);
}

const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: "center",
    paddingBottom: 20, // Ajusta esto según sea necesario para el espacio adicional al final
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    color: "black",
  },
});
