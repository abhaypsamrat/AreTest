import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider, useDispatch} from 'react-redux';
import store from './src/redux/store';
import BottomTabs from './src/navigation/BottomTabs';
import SignUp from './src/screens/SignUp';
import SignIn from './src/screens/SignIn';
import MoreInfo from './src/components/MoreInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setEmail} from './src/redux/slices/authSlice';

const Stack = createStackNavigator();

const AppContent = () => {
  const [initialRoute, setInitialRoute] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const email = await AsyncStorage.getItem('userData');
        if (email) {
          dispatch(setEmail(email));
          setInitialRoute('BottomTabs');
        } else {
          setInitialRoute('SignIn');
        }
      } catch (err) {
        console.log('Error reading AsyncStorage:', err);
        setInitialRoute('SignIn');
      }
    };

    checkUser();
  }, [dispatch]);

  if (!initialRoute) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="MoreInfo" component={MoreInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
