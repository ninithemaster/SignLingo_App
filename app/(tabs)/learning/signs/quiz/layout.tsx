import { Stack } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function QuizLayout() {
  const { theme } = useAppTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.cardBackground,
        },
        headerTintColor: theme.text,
        headerShadowVisible: true,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="question1"
        options={{
          title: 'Quiz Question 1',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="question2"
        options={{
          title: 'Quiz Question 2',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="question3"
        options={{
          title: 'Quiz Question 3',
          headerShown: true,
        }}
      />
    </Stack>
  );
}