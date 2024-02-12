import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import MainStack from './navegacion/MainStack';
import { AuthenticatedUserProvider } from './fb/AuthenticatedUserProvider';

function App() {

  return (
    <AuthenticatedUserProvider>
      <MainStack/>
    </AuthenticatedUserProvider>
  );
}

export default App;