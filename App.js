import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import DailyGoalsScreen from './screens/DailyGoalsScreen';
import MonthlyCompletionScreen from './screens/MonthlyCompletionScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}
