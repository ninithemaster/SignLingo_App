import { Stack } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function JapaneseLayout() {
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
          title: 'Japanese Language',
          headerShown: true,
          headerLargeTitle: true,
          headerLargeTitleStyle: {
            color: theme.text,
          },
        }}
      />
      <Stack.Screen
        name="rookie"
        options={{
          title: 'Rookie Level',
          presentation: 'card',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="advanced"
        options={{
          title: 'Advanced Level',
          presentation: 'card',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="heritage"
        options={{
          title: 'Japanese Heritage',
          presentation: 'card',
          headerShown: false,
        }}
      />
    </Stack>
  );
}