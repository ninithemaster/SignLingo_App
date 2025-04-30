import { Stack } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';

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
        name="rookie"
        options={{
          title: 'Rookie Level',
          presentation: 'card',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="advanced"
        options={{
          title: 'Advcanced Level',
          presentation: 'card',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="video"
        options={{
          title: 'Video Lectures',
          presentation: 'card',
          headerShown: false,
        }}
      />
    </Stack>
  );
}