import { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { forgotPassword } from '../services/api';

export default function ForgotPassword() {
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const router = useRouter();

  const handleReset = async () => {
    if (!username) {
      Alert.alert('Error', 'Username is required!');
      return;
    }

    setLoading(true); // Start loading

    try {
      // Call the forgotPassword API
      const data = await forgotPassword(username);

      if (data.message) {
        // If the request is successful, show a success message
        Alert.alert('Success', data.message);
        router.push('/');
      } else {
        // If the request fails, show an error message
        Alert.alert('Error', data.error || 'Password reset failed');
      }
    } catch (error) {
      // Handle any errors
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        mode="outlined"
      />
      <Button
        mode="contained"
        onPress={handleReset}
        style={styles.button}
        loading={loading} // Show loading indicator
        disabled={loading} // Disable button while loading
      >
        {loading ? 'Sending...' : 'Reset Password'}
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