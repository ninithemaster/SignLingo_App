import { Stack } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function TimeLayout() {
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
          title: 'Days & Time',
          presentation: 'card',
          headerLargeTitle: true,
          headerLargeTitleStyle: {
            color: theme.text,
          },
          headerShown: true,
        }}
      />
    </Stack>
  );
} 