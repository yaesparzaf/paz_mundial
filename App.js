import { SafeAreaView,StyleSheet} from 'react-native';
import MainStack from './navegacion/MainStack';
import {AuthenticatedUserProvider} from './navegacion/MainStack';


function App() {
  //const earth = require('./assets/earth.mp4');
  return (
    <AuthenticatedUserProvider>
        <MainStack/>
    </AuthenticatedUserProvider>
      
    
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    
  },
});

export default App;
