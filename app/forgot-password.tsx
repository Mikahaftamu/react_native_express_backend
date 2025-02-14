import { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
  const router = useRouter();

  const handleReset = () => {
    if (!email) {
      Alert.alert('Error', 'Email is required!');
      return;
    }
    Alert.alert('Success', 'Password reset email sent!');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
      />
      <Button mode="contained" onPress={handleReset} style={styles.button}>
        Reset Password
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
    backgroundColor: '#f5f5f5', // Added background color
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Centered title
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
    textAlign: 'center', // Centered link
  },
});