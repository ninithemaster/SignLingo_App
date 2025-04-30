import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { View } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { useColorScheme } from '@/components/useColorScheme';
import { AnimatedSplashScreen } from '@/components/AnimatedSplashScreen';
import { ThemeProvider as CustomThemeProvider } from '@/constants/ThemeContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(auth)',
};

function useProtectedRoute() {
  const segments = useSegments();
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        const inAuthGroup = segments[0] === '(auth)';

        if (!token && !inAuthGroup) {
          // Redirect to the sign-in page.
          router.replace('/sign-in');
        } else if (token && inAuthGroup) {
          // Redirect away from the sign-in page.
          router.replace('/home');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setIsAuthChecked(true);
      }
    };

    checkAuth();
  }, [segments]);

  return isAuthChecked;
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const [isSplashAnimationComplete, setIsSplashAnimationComplete] = useState(false);
  const isAuthChecked = useProtectedRoute();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded || !isAuthChecked) {
    return null;
  }

  if (!isSplashAnimationComplete) {
    return (
      <AnimatedSplashScreen 
        onAnimationComplete={() => setIsSplashAnimationComplete(true)} 
      />
    );
  }

  return (
    <CustomThemeProvider>
      <RootLayoutNav />
    </CustomThemeProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" />
      </Stack>
    </ThemeProvider>
  );
}
