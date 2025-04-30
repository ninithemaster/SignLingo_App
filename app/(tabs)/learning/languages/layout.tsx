import { Stack } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function LanguagesLayout() {
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
          title: "Languages",
          headerTitle: "Languages"
        }}
      />
      <Stack.Screen 
        name="english"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="hindi/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="hindi/layout"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="hindi/video"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="hindi/rookie/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="hindi/rookie/layout"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="hindi/advanced/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="hindi/advanced/layout"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="marathi/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="marathi/layout"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="marathi/rookie/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="marathi/rookie/layout"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="marathi/advanced/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="marathi/advanced/layout"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="japanese/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="japanese/layout"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="japanese/heritage"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="japanese/rookie/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="japanese/rookie/layout"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="japanese/advanced/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="japanese/advanced/layout"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}