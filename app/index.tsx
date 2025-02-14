import { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Username and password are required!');
      return;
    }
    router.push('/welcome');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <View style={styles.links}>
        <Link href="/register" style={styles.link}>Create an account</Link>
        <Link href="/forgot-password" style={styles.link}>Forgot Password?</Link>
      </View>
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
  links: {
    marginTop: 20,
    alignItems: 'center',
  },
  link: {
    color: '#6200ee',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});