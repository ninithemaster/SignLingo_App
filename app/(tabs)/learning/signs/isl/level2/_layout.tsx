import { Stack } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function Level2Layout() {
  const { theme } = useAppTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.cardBackground,
        },
        headerTintColor: theme.text,
        headerShadowVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Level 2: Grammar',
          headerShown: false,
        }}
      />
    </Stack>
  );
} 