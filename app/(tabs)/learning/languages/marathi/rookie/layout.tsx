import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';

export default function MarathiLayout() {
  const { theme } = useAppTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.cardBackground,
        },
        headerTintColor: theme.text,
        headerShadowVisible: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Marathi Language',
          headerShown: true,
          headerLargeTitle: true,
          headerLargeTitleStyle: {
            color: theme.text,
          },
        }}
      />
      <Stack.Screen
        name="alphabets"
        options={{
          title: 'Alphabets (स्वर/व्यंजन/Barakhadi)',
          presentation: 'card',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="numbers"
        options={{
          title: 'Numbers (१-१00)',
          presentation: 'card',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="shabdkosh"
        options={{
          title: 'Shabdkosh (Dictionary)',
          presentation: 'card',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="greetings"
        options={{
          title: 'Greetings and Phrases',
          presentation: 'card',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="questions"
        options={{
          title: 'Simple Questions',
          presentation: 'card',
          headerShown: false,
        }}
      />
    </Stack>
  );
}