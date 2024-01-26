import { SafeAreaView,StyleSheet} from 'react-native';
import MainStack from './navegacion/MainStack';
import {AuthenticatedUserProvider, DatosUsers} from './fb/DatosUsers';
import { MeditarContext } from './assets/componentes/MeditarContext';


function App() {
  //const earth = require('./assets/earth.mp4');
  return (
    <AuthenticatedUserProvider>
      <MeditarContext> 
        <MainStack/>
      </MeditarContext>
        <DatosUsers/>
    </AuthenticatedUserProvider>
      
    
  );
}
export default App;
