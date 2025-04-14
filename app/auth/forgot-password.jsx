import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';
import axios from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post("http://192.168.1.6:5000/forgot-password", {
        email,
      });

      console.log('Reset password response:', response.data);
      Alert.alert("Success", "If an account exists, reset instructions have been sent.");
      setIsSubmitted(true);
    } catch (error) {
      console.error('Reset password error:', error);
      if (error.response?.data?.message) {
        Alert.alert("Error", error.response.data.message);
      } else {
        Alert.alert("Error", "Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      {!isSubmitted ? (
        <>
          <Text style={styles.description}>
            Enter your email address and we'll send you instructions to reset your password.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Send Reset Instructions</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>
            If an account exists for {email}, you will receive password reset instructions.
          </Text>
        </View>
      )}

      <View style={styles.links}>
        <Link href="/auth/sign-in" style={styles.link}>
          <Text>Back to Sign In</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#f4511e',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  links: {
    marginTop: 20,
    alignItems: 'center',
  },
  link: {
    marginVertical: 5,
  },
  successContainer: {
    alignItems: 'center',
    padding: 20,
  },
  successText: {
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },
});
