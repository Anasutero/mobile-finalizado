import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login } from '../telas/Login'
import { RotasTab } from './RotasTab'
import { Cadastro } from '../telas/Cadastro'
import { AuthProvider } from '../componentes/AuthContext'

const { Navigator, Screen } = createNativeStackNavigator()

export function RotasStack(){
    return(
       <AuthProvider>

       
        <NavigationContainer>

            <Navigator screenOptions={ { headerShown: false } }>

                <Screen 
                    name='login'
                    component={Login}
                />     

                <Screen 
                    name='rotasTab'
                    component={RotasTab}
                />   
                <Screen
                        name='cadastro'
                        component={Cadastro}
                    />
  
                
            </Navigator>

        </NavigationContainer>
        </AuthProvider>
    )
}
