import { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Pressable,
    Alert,
    ScrollView, // Import ScrollView
    Platform,   // Import Platform
    ActivityIndicator // Import ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import axios from "axios";

// --- Re-apply Style Constants ---
const THEME_COLOR = '#E91E63';
const LIGHT_GREY_BG = '#F8F8F8';
const BORDER_COLOR = '#E0E0E0';
const PLACEHOLDER_COLOR = '#A0A0A0';
const DARK_TEXT = '#333333';
const MEDIUM_TEXT = '#666666';

export default function SignUp() {
  // --- 1. Add the new state variable ---
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    // --- 3. Update Validation ---
    if (!name || !email || !password || !confirmPassword) { // Added !name check
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

     if (password.length < 6) {
       Alert.alert('Error', 'Password must be at least 6 characters long.');
       return;
     }

    setIsLoading(true);
    try {
      // --- 4. Update API Call Data ---
      console.log(name, email, password)
      const response = await axios.post('http://192.168.1.7:5000/signup',{
        name, // Include name in the request body
        email,
        password,
      });
      console.log("Sign up successful:", response.data);

      Alert.alert(
        'Success',
        'Account created successfully! Please sign in.',
        [{ text: 'OK', onPress: () => router.replace('/sign-in') }]
      );
    } catch (error) {
       console.error("Sign up error:", error);
       let errorMessage = 'An error occurred while creating your account.';
       if (error.response) {
           errorMessage = error.response.data?.message || `Server Error: ${error.response.status}`;
           if (error.response.status === 409 || error.response.data?.message?.toLowerCase().includes('exist')) {
               errorMessage = 'An account with this email already exists. Please sign in.';
           }
       } else if (error.request) {
           errorMessage = 'Could not connect to the server. Check your network.';
       } else {
           errorMessage = error.message || 'An unexpected error occurred.';
       }
      Alert.alert('Sign Up Failed', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // --- Apply SafeAreaView and ScrollView from previous styling ---
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* --- Use container View from previous styling --- */}
        <View style={styles.container}>

          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>

          {/* --- 2. Add the Name Input Field --- */}
          <TextInput
            style={styles.input} // Reuse existing style
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words" // Capitalize first letter of each word
            editable={!isLoading}
            placeholderTextColor={PLACEHOLDER_COLOR}
            textContentType="name" // Helps autofill
          />

          {/* Email Input */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isLoading}
            placeholderTextColor={PLACEHOLDER_COLOR}
            textContentType="emailAddress"
          />

          {/* Password Input */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!isLoading}
            placeholderTextColor={PLACEHOLDER_COLOR}
            textContentType="newPassword"
          />

          {/* Confirm Password Input */}
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            editable={!isLoading}
            placeholderTextColor={PLACEHOLDER_COLOR}
            textContentType="newPassword"
          />

          {/* Sign Up Button */}
          <Pressable
            style={({ pressed }) => [
              styles.button,
              isLoading && styles.buttonDisabled,
              pressed && !isLoading && styles.buttonPressed,
            ]}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Create Account</Text>
            )}
          </Pressable>

          {/* Sign In Link */}
          {/* --- Use footer View for link positioning --- */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            {/* --- Update Link path to include group --- */}
            <Link href="/sign-in" asChild>
              <Pressable disabled={isLoading}>
                <Text style={[styles.footerText, styles.linkText]}>Sign In</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Re-apply the updated styles ---
const styles = StyleSheet.create({
   safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40, // Adjusted padding (can be tuned)
    paddingHorizontal: 25,
  },
  container: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
 title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: DARK_TEXT,
    marginBottom: 8,
    textAlign: 'center',
 },
   subtitle: {
    fontSize: 16,
    color: MEDIUM_TEXT,
    marginBottom: 35,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 55,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 12,
    paddingHorizontal: 18,
    // --- Apply margin bottom to ALL inputs ---
    marginBottom: 18,
    backgroundColor: LIGHT_GREY_BG,
    fontSize: 16,
    color: DARK_TEXT,
  },
   button: {
    width: '100%',
    height: 55,
    backgroundColor: THEME_COLOR,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    // --- Add slight top margin after last input ---
    marginTop: 7, // Adjusted since last input now has marginBottom
    shadowColor: Platform.OS === 'ios' ? '#000' : THEME_COLOR,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#F5A9BC',
    elevation: 0,
    shadowOpacity: 0,
  },
   buttonPressed: {
    backgroundColor: '#D81B60',
    transform: [{ scale: 0.99 }],
   },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  footerText: {
    fontSize: 14,
    color: MEDIUM_TEXT,
  },
   linkText: {
    color: THEME_COLOR,
    fontSize: 14,
    fontWeight: '500',
  },
});
