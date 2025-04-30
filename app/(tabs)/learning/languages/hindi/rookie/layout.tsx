import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';

export default function HindiLayout() {
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
          title: 'Hindi Language',
          headerShown: true,
          headerLargeTitle: true,
          headerLargeTitleStyle: {
            color: theme.text,
          },
        }}
      />
      <Stack.Screen
        name="introduction"
        options={{
          title: 'Introduction to Hindi',
          presentation: 'card',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="alphabets"
        options={{
          title: 'Hindi Alphabets',
          presentation: 'card',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="commonphrases"
        options={{
          title: 'Common Phrases',
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
        name="basicsentences"
        options={{
          title: 'Basic Sentences',
          presentation: 'card',
          headerShown: false,
        }}
      />
    </Stack>
  );
}