import { Stack } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function SignsLayout() {
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
          title: "Sign Languages",
        }}
      />
      <Stack.Screen 
        name="asl"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
} 