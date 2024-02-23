import React, { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "./firebase-config";

const useContador = () => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const actualizarContador = (snapshot) => {
      setTotal(snapshot.size);
    };

    const consulta = query(
      collection(db, "meditando"),
      where("meditando", "==", true)
    );

    const unsubscribe = onSnapshot(consulta, actualizarContador);

    return () => unsubscribe();
  }, [total]);

  return total;
};

export default useContador;
