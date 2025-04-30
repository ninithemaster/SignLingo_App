import { Stack } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';

function ExpressLayout() {
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
          title: 'Express',
          headerShown: true,
        }}
      />
    </Stack>
  );
}

export default ExpressLayout; 