// App.js
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import Inicio from './components/Inicio';
import Adicionar from './components/Adicionar';
import Pendentes from './components/Pendentes';
import Tasks from './components/Tasks';
import DetalhesVistoria from './components/DetalhesVistoria'; // Import the new details screen
import Login from './components/Login'

function BottomTabs() {
  return (
    <Tab.Navigator initialRouteName="Inicio">
      <Tab.Screen 
        name="Inicio" 
        component={Inicio} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Pendentes" 
        component={Pendentes} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Adicionar" 
        component={Adicionar} 
        options={{ headerShown: false }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar backgroundColor='black'/>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }} />
          <Stack.Screen name="DetalhesVistoria" component={DetalhesVistoria} options={{ title: 'Detalhes da Vistoria' }} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
