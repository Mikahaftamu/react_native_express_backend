import { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { register } from '../services/api';
import axios from 'axios';

export default function Register() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const router = useRouter();

  const handleRegister = async () => {
    if (!firstName || !lastName || !username || !password) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    setLoading(true); // Start loading

    try {
      // Call the register API
      const res = await axios.get(`http://192.168.137.242:5000/api/auth/users`);
      console.log(res.data);
      console.log(firstName,lastName,username,password);
      const data = await register(firstName, lastName, username, password);

      if (data.message) {
        // If registration is successful, show a success message and navigate back to login
        Alert.alert('Success', data.message);
        router.push('/');
      } else {
        // If registration fails, show an error message
        Alert.alert('Error', data.error || 'Registration failed');
      }
    } catch (error) {
      // Handle any errors
      console.log(error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
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
      <Button
        mode="contained"
        onPress={handleRegister}
        style={styles.button}
        loading={loading} // Show loading indicator
        disabled={loading} // Disable button while loading
      >
        {loading ? 'Registering...' : 'Register'}
      </Button>
      <Link href="/" style={styles.link}>
        Back to Login
      </Link>
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