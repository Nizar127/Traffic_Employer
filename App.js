import 'react-native-gesture-handler';
import React from 'react';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import {Container, Button} from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import EmployerProfile from './screens/profile'
import PostJob from './screens/job_post'
import ViewJob from './screens/Feed'
import JobProgress from './screens/job_status'
import Home from './Home'
import Login from './Auth/Login'
import SignUp from './Auth/SignUp'
import JobCreatorDetail from './screens/JobCreatorDetail'
import EditProfileJobCreator from './screens/EditProfileEmployer'
import Search from './screens/Search'
import Profile from './screens/profile';
import SplashScreen from './SplashScreen';
import MyJob from './screens/MyJob';
import MyOrderDetail from './screens/MyOrderDetail';
import { useEffect } from 'react/cjs/react.development';




function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="splashscreen" component={SplashScreen}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="ViewJob" component={ViewJob} />
        <Stack.Screen name="MyJob" component={MyJob} />
        <Stack.Screen name="MyOrderDetail" component={MyOrderDetail} />
        <Stack.Screen name="EmployerProfile" component={EmployerProfile} />
        <Stack.Screen name="JobCreatorDetail" component={JobCreatorDetail}/>
        <Stack.Screen name="PostJob" component={PostJob} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="EditProfileJobCreator" component={EditProfileJobCreator} />
        <Stack.Screen name="JobProgress" component={JobProgress}/> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
/* } */

const Stack = createStackNavigator();
export default App;


const Style = StyleSheet.create({
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 220,
    backgroundColor: '#E91E63',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
},
})
