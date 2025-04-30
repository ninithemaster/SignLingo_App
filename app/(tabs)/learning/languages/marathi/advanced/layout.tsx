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
        name="grammar"
        options={{
          title: 'Tenses and Grammar',
          presentation: 'card',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="idioms"
        options={{
          title: 'Proverbs and Idioms',
          presentation: 'card',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="conversations"
        options={{
          title: 'Conversational Marathi',
          presentation: 'card',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="newsheadlines"
        options={{
          title: 'Simple News Headlines',
          presentation: 'card',
          headerShown: false,
        }}
      />
    </Stack>
  );
}