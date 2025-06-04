import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { createUserTable, insertUser } from '../db/userUtils';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    createUserTable(); // ensure the table exists
  }, []);

  const handleSignup = () => {
    if (!email || !password) return Alert.alert('Error', 'Fill in all fields');

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
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Sign Up" onPress={handleSignup} />
      <Text onPress={() => navigation.navigate('Login')} style={styles.link}>Already have an account? Log In</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 },
  link: { marginTop: 15, color: 'blue' }
});
