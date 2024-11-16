import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Screen1/Login';
import Home from './Screen2/Home';
import AddServiceScreen from './Screen3/Add';
import EditServiceScreen from './Screen5/Edit';
import DeleteService from './Screen6/Delete';
import ServiceDetailScreen from './Screen4/ServiceDetailScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';



const Stack = createStackNavigator();
const App = () => {
  return (
    <MenuProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddService"
              component={AddServiceScreen}
              options={{ title: 'Add Service' }}
            />
            <Stack.Screen
              name="ServiceDetail"
              component={ServiceDetailScreen}
              options={{ title: 'Service Detail' }}
            />
            <Stack.Screen
              name="EditService"
              component={EditServiceScreen}
              options={{ title: 'Edit Service' }}
            />
            <Stack.Screen
              name="DeleteService"
              component={DeleteService}
              options={{ title: 'Delete Service' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </MenuProvider>
  );
};
 export default App;
