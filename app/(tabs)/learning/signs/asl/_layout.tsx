import { Stack } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function ASLLayout() {
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
          title: 'ASL',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="intro"
        options={{
          title: 'Introduction',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="basics"
        options={{
          title: 'Basics',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="everyday"
        options={{
          title: 'Everyday Signs',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="express"
        options={{
          title: 'Express',
          headerShown: false,
        }}
      />
    </Stack>
  );
} 