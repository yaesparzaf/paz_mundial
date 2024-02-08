import { View, Text } from "react-native";
import React from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase-config";

const Contador = async () => {
  try {
    const consulta = query(
      collection(db, "meditando"),
      where("meditando", "==", true)
    );
    const queryresult = await getDocs(consulta);
    const total = queryresult.size;
    return total;
  } catch (error) {
    console.error("error en contador", error);
    return 0;
  }
};

export default Contador;
