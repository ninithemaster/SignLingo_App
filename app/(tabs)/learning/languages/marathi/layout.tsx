import { Stack } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function MarathiLayout() {
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
          title: 'Marathi Language',
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
          title: 'Rookie ',
          presentation: 'card',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="advanced"
        options={{
          title: 'Advcanced ',
          presentation: 'card',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="folklife"
        options={{
          title: 'Folk Life',
          presentation: 'card',
          headerShown: false,
        }}
      />
    </Stack>
  );
}