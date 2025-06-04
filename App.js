import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignUpScreen';
import DailyGoalsScreen from './screens/DailyGoalsScreen';
import MonthlyCompletionScreen from './screens/MonthlyCompletionScreen';
import { Ionicons } from '@expo/vector-icons';
import { createUserTable } from './database/dbUtils';
import { initDB, getDB } from './database.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName =
            route.name === 'Daily Goals'
              ? 'checkmark-circle-outline'
              : 'calendar-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6ABF69',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Daily Goals" component={DailyGoalsScreen} />
      <Tab.Screen name="Monthly Completion" component={MonthlyCompletionScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  (async () => {
    try {
      await initDB();
      await createUserTable();
      console.log('DB ready with users table');

      const db = getDB();
    } catch (err) {
      console.error('DB setup error:', err);
    }
  })();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}