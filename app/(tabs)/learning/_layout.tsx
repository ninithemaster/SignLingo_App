import { Stack } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function LearningLayout() {
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
        }
      }}
    >
      <Stack.Screen 
        name="index"
        options={{
          title: "Learning",
        }}
      />
      <Stack.Screen 
        name="signs"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="languages/index"
        options={{
          title: "Languages",
        }}
      />
    </Stack>
  );
} 