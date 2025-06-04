import React, { useState } from 'react';
import { TextInput, Text, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles, colors } from '../styles';
import { insertUser } from '../database/dbUtils.js';
import { getDB } from '../database.js';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (!email || !password) return Alert.alert('Error', 'Fill in all fields');
  
    console.log('Attempting to sign up with:', email, password);
  
    insertUser(
      email,
      password,
      () => {
        Alert.alert('Success', 'Account created!');
        navigation.navigate('Login');
      },
      (error) => {
        if (error.message.includes('UNIQUE constraint')) {
          Alert.alert('Error', 'Email already exists');
        } else {
          Alert.alert('Error', 'Something went wrong');
        }
      }
    );
  };  

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={[globalStyles.title, { textAlign: 'center' }]}>Create an Account</Text>
      <Text style={[globalStyles.subtitle, { textAlign: 'center', marginBottom: 20 }]}>
        Sign up to start building habits
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

      <TouchableOpacity style={globalStyles.button} onPress={handleSignup}>
        <Text style={globalStyles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>

      <Text style={{ marginTop: 20, textAlign: 'center' }}>
        Already have an account?{' '}
        <Text
          style={{ color: colors.primary }}
          onPress={() => navigation.navigate('Login')}
        >
          Log in.
        </Text>
      </Text>
    </SafeAreaView>
  );
}