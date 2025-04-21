import { Stack } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function EverydayLayout() {
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
          title: 'Everyday Signs',
          headerShown: false,
          headerLargeTitle: true,
          headerLargeTitleStyle: {
            color: theme.text,
          },
        }}
      />
      <Stack.Screen
        name="colors"
        options={{
          title: 'Colors',
          presentation: 'card',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="family"
        options={{
          title: 'Family',
          presentation: 'card',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="food"
        options={{
          title: 'Food & Drink',
          presentation: 'card',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="time"
        options={{
          title: 'Days & Time',
          presentation: 'card',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="emotions"
        options={{
          title: 'Emotions',
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="conversations"
        options={{
          title: 'Conversations',
          presentation: 'card',
        }}
      />
    </Stack>
  );
} 