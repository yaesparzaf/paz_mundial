import React, { createContext, useContext, useState } from "react";

const AuthenticatedUserContex = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  return (
    <AuthenticatedUserContex.Provider value={{ usuario, setUsuario }}>
      {children}
    </AuthenticatedUserContex.Provider>
  );
};

const contexUser = () => {
  const context = useContext(AuthenticatedUserContex);
  if (!context) {
    throw new Error("contexUser debe ser utilizado dentro de un UserProvider");
  }
  return context;
};

export { AuthenticatedUserContex,AuthenticatedUserProvider, contexUser };
