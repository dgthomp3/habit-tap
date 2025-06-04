import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import DailyGoalsScreen from './screens/DailyGoalsScreen';
import LoginScreen from './screens/login';
import SignupScreen from './screens/signup';
import HomeScreen from './screens/homescreen';
import MonthlyCompletionScreen from './screens/MonthlyCompletionScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <DailyGoalsScreenScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});