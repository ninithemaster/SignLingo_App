import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';
import { Icon } from "@/constants/Icons";
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

const Settings = () => {
  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // Clear local storage
              await SecureStore.deleteItemAsync('userToken');
              await SecureStore.deleteItemAsync('userName');
              
              // Here you would typically also make an API call to delete the user's data
              // await deleteUserAccount();
              
              // Navigate to sign in screen
              router.replace('/sign-in');
            } catch (error) {
              Alert.alert("Error", "Failed to delete account. Please try again.");
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-6">Settings</Text>
        
        {/* Delete Account Section */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-4">Account</Text>
          <TouchableOpacity 
            className="flex-row items-center p-4 bg-red-50 rounded-xl"
            onPress={handleDeleteAccount}
          >
            <Icon name="trash" size={24} color="#EF4444" library="FontAwesome" />
            <Text className="ml-3 text-red-500 font-medium">Delete Account</Text>
          </TouchableOpacity>
        </View>

        {/* About Us Section */}
        <View>
          <Text className="text-lg font-semibold mb-4">About</Text>
          <TouchableOpacity 
            className="flex-row items-center p-4 bg-gray-50 rounded-xl mb-3"
            onPress={() => router.push('/about')}
          >
            <Icon name="info-circle" size={24} color="#4B5563" library="FontAwesome" />
            <Text className="ml-3 text-gray-700">About Us</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-row items-center p-4 bg-gray-50 rounded-xl"
            onPress={() => router.push('/privacy-policy')}
          >
            <Icon name="shield" size={24} color="#4B5563" library="FontAwesome" />
            <Text className="ml-3 text-gray-700">Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Settings;
