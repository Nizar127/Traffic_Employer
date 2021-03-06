import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EmployerProfile from './screens/profile';
import Feed from './screens/Feed';
import PostJob from './screens/job_post';
import { Ionicons } from '@expo/vector-icons';




export default function Home() {
    return (
     
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({  color, size }) => {
            if (route.name === 'Feed') {
              return (
                <Ionicons
                  name={'md-home-outline'}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'PostJob') {
              return (
                <Ionicons
                  name={'md-add'}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'EmployerProfile'){
              <Ionicons
                  name={'md-albums'}
                  size={size}
                  color={color}
                />
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
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
  