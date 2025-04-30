import { Stack } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function AdvancedLayout() {
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
          title: 'Advanced Level - Japanese',
          headerShown: true,
          headerLargeTitle: true,
          headerLargeTitleStyle: {
            color: theme.text,
          },
        }}
      />
      <Stack.Screen
        name="grammar"
        options={{
          title: 'Advanced Grammar',
          presentation: 'card',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="vocabulary"
        options={{
          title: 'Advanced Vocabulary',
          presentation: 'card',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="kanji"
        options={{
          title: 'Kanji Mastery',
          presentation: 'card',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="keigo"
        options={{
          title: 'Keigo (Honorific Language)',
          presentation: 'card',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="causative"
        options={{
          title: 'Causative and Causative Passive Forms ',
          presentation: 'card',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="literaryjapanese"
        options={{
          title: 'Literary and Classical Japanese',
          presentation: 'card',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="slang"
        options={{
          title: 'Slang and Modern Expressions',
          presentation: 'card',
          headerShown: true,
        }}
      />
       <Stack.Screen
        name="listeningspeaking"
        options={{
          title: 'Advanced Listening and Speaking',
          presentation: 'card',
          headerShown: true,
        }}
      />
    </Stack>
  );
}