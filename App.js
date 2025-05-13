import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabs from './src/navigation/BottomTabs';
import SignUp from './src/screens/SignUp';
import SignIn from './src/screens/SignIn';
import MoreInfo from './src/components/MoreInfo';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="MoreInfo" component={MoreInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
