import { Stack } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function RookieLayout() {
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
          title: 'Rookie Level - Japanese',
          headerShown: true,
          headerLargeTitle: true,
          headerLargeTitleStyle: {
            color: theme.text,
          },
        }}
      />
      <Stack.Screen
        name="alphabetbasics"
        options={{
          title: 'Japanese Alphabet Basics',
          presentation: 'card',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="basicvocabulary"
        options={{
          title: 'Basic Vocabulary',
          presentation: 'card',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="basicgrammar"
        options={{
          title: 'Basic Grammar',
          presentation: 'card',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="essentialphrases"
        options={{
          title: 'Essential Phrases',
          presentation: 'card',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="kanji"
        options={{
          title: 'Basic Kanji',
          presentation: 'card',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="pronunciation"
        options={{
          title: 'Pronunciation and Intonation',
          presentation: 'card',
          headerShown: true,
        }}
      />
    </Stack>
  );
}