import { Stack } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function EmotionsLayout() {
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
          title: 'Emotions',
          headerShown: false,
        }}
      />
    </Stack>
  );
} 