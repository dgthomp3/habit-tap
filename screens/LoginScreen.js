import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles, colors } from '../styles';
import { getUser } from '../database/dbUtils';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) return Alert.alert('Error', 'Fill in all fields');
    getUser(email, password, (users) => {
      if (users.length > 0) {
        navigation.navigate('MainTabs');
      } else {
        Alert.alert('Login Failed', 'Invalid credentials');
      }
    });
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={[globalStyles.title, { textAlign: 'center' }]}>Let’s get started!</Text>
      <Text style={[globalStyles.subtitle, { textAlign: 'center', marginBottom: 20 }]}>
        Login to build habits
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={globalStyles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={globalStyles.input}
      />

      {/* Placeholder for 'Keep me logged in' */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <View style={{ width: 20, height: 20, borderWidth: 1, marginRight: 8 }} />
        <Text>Keep me logged in</Text>
      </View>

      <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <Text style={{ marginTop: 20, textAlign: 'center' }}>
        No account yet?{' '}
        <Text
          style={{ color: colors.primary }}
          onPress={() => navigation.navigate('Signup')}
        >
          Register here.
        </Text>
      </Text>
    </SafeAreaView>
  );
}
