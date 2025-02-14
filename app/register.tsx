import { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';

export default function Register() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleRegister = () => {
    if (!firstName || !lastName || !username || !password) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
    Alert.alert('Success', 'Account created!');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        label="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        mode="outlined"
      />
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Register
      </Button>
      <Link href="/" style={styles.link}>Back to Login</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  link: {
    color: '#6200ee',
    marginTop: 20,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});