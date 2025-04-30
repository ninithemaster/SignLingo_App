import { Stack } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function AdvancedStackLayout() {
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
          title: "Advanced  Overview",
        }}
      />
      <Stack.Screen 
        name="complexsentences"
        options={{
          title: "Complex Sentence Structures",
        }}
      />
      <Stack.Screen 
        name="grammar"
        options={{
          title: "Advanced Grammar",
        }}
      />
      <Stack.Screen 
        name="professional"
        options={{
          title: "Polite & Formal Expressions",
        }}
      />
    <Stack.Screen 
        name="idioms"
        options={{
          title: "Idioms & Phrasal Verbs",
        }}
      />
      <Stack.Screen 
        name="accents"
        options={{
          title: "English Accents",
        }}
      />
    
    </Stack>
  );
}