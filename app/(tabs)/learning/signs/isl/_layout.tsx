import { Stack } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function ISLLayout() {
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
          title: 'Indian Sign Language',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="introduction"
        options={{
          title: 'Introduction',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="basic"
        options={{
          title: 'Level 1: Basics',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="level2"
        options={{
          title: 'Level 2: Grammar',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="conversations"
        options={{
          title: 'Video Lessons',
          headerShown: true,
        }}
      />
    </Stack>
  );
} 