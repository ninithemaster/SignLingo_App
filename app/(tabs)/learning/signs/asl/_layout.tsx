import { Stack } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function ASLLayout() {
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
          title: "ASL",
          headerShown: true,
        }}
      />
      <Stack.Screen 
        name="intro"
        options={{
          title: "Intro",
          headerShown: true,
        }}
      />
      <Stack.Screen 
        name="basics"
        options={{
          title: "Level 1: Basics",
          headerShown: true,
        }}
      />
      <Stack.Screen 
        name="everyday"
        options={{
          title: "Level 2: Everyday Signs",
          headerShown: true,
        }}
      />
    </Stack>
  );
} 