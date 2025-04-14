import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';
import axios from "axios"
export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async() => {
    try {
      const response = await axios.post("http://192.168.1.6:5000/signin", {
        email,
        password,
      });
      console.log(response.data);
      
      Alert.alert("Success", response.data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        Alert.alert("Error", error.response.data.message || "Failed to login");
      } else {
        Alert.alert("Error", "Failed to login");
      }
    }
  };;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      
      <View style={styles.links}>
        <Link href="/auth/sign-up" style={styles.link}>
          <Text>Don't have an account? Sign up</Text>
        </Link>
        
        <Link href="/auth/forgot-password" style={styles.link}>
          <Text>Forgot Password?</Text>
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
    marginBottom: 30,
    textAlign: 'center',
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
}); 