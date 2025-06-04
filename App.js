import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { globalStyles } from './styles';
import DailyGoalsScreenScreen from './screens/DailyGoalsScreen';
import LoginScreen from './screens/login';
import SignupScreen from './screens/signup';
import HomeScreen from './screens/homescreen';

export default function App() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <DailyGoalsScreenScreen />
    </SafeAreaView>
   <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
