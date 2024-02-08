import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import MainStack from './navegacion/MainStack';
import { AuthenticatedUserProvider } from './fb/DatosUsers';
import Login from './assets/componentes/Login'; // Importa tu componente de inicio de sesión

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthenticatedUserProvider>
      <SafeAreaView style={styles.container}>
        {isAuthenticated ? (
          <MainStack />
        ) : (
          <Login onLogin={() => setIsAuthenticated(true)} />
        )}
      </SafeAreaView>
    </AuthenticatedUserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
