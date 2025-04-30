import { Stack } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function RookieStackLayout() {
  const { theme } = useAppTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: false, // Hide the header for all screens
      }}
    >
      <Stack.Screen 
        name="index"
        options={{
          title: "Rookie Overview",
        }}
      />
      <Stack.Screen 
        name="vocabulary"
        options={{
          title: "Vocabulary Builder",
        }}
      />
      <Stack.Screen 
        name="grammar"
        options={{
          title: "Grammar Essentials",
        }}
      />
    </Stack>
  );
}