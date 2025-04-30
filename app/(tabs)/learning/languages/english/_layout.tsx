import { Stack } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function EnglishLayout() {
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
        headerShown: false, // Ensure header is hidden globally
      }}
    >
      <Stack.Screen 
        name="index"
        options={{
          title: "English Language",
          headerTitle:"English Language"
        }}
      />
      <Stack.Screen 
        name="rookie"
        options={{
          title: "Rookie Overview",
          headerShown: true,
        }}
      />
      <Stack.Screen 
        name="advanced"
        options={{
          title: "Advanced ",
          headerShown: true,
        }}
      />
       <Stack.Screen 
        name="cultural"
        options={{
          title: "Cultural Knowledge",
          headerShown: true,
        }}
      />
    </Stack>
  );
}