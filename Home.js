import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EmployerProfile from './screens/profile';
import Feed from './screens/Feed';
import PostJob from './screens/job_post';

/* function TestScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
} */

export default function Home() {
    return (
     
        <Tab.Navigator>
          <Tab.Screen name="Feed" component={Feed} /> 
          <Tab.Screen name="PostJob" component={PostJob} />
          <Tab.Screen name="EmployerProfile" component={EmployerProfile} />
        </Tab.Navigator>
     
    );
  }
  
  const Tab = createBottomTabNavigator();
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  