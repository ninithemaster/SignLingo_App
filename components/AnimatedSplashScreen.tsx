import React, { useEffect } from 'react';
import { Animated, Dimensions, StyleSheet, View, Text, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

const { width, height } = Dimensions.get('window');

interface AnimatedSplashScreenProps {
  onAnimationComplete: () => void;
}

export const AnimatedSplashScreen: React.FC<AnimatedSplashScreenProps> = ({ 
  onAnimationComplete 
}) => {
  // Animation values
  const logoScale = new Animated.Value(0);
  const logoOpacity = new Animated.Value(0);
  const textOpacity = new Animated.Value(0);
  const textTranslateY = new Animated.Value(20);
  const backgroundOpacity = new Animated.Value(0);
  const taglineOpacity = new Animated.Value(0);
  const taglineTranslateY = new Animated.Value(10);

  useEffect(() => {
    const animate = async () => {
      try {
        // Prevent the splash screen from auto-hiding
        await SplashScreen.preventAutoHideAsync();
        
        // Start with a slight delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Animation sequence
        Animated.sequence([
          // Fade in background
          Animated.timing(backgroundOpacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          // Logo entrance animation
          Animated.parallel([
            Animated.spring(logoScale, {
              toValue: 1,
              tension: 50,
              friction: 7,
              useNativeDriver: true,
            }),
            Animated.timing(logoOpacity, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
          ]),
          // Text animations
          Animated.parallel([
            Animated.timing(textOpacity, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            }),
            Animated.spring(textTranslateY, {
              toValue: 0,
              tension: 50,
              friction: 7,
              useNativeDriver: true,
            }),
          ]),
          // Tagline animations
          Animated.parallel([
            Animated.timing(taglineOpacity, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            }),
            Animated.spring(taglineTranslateY, {
              toValue: 0,
              tension: 50,
              friction: 7,
              useNativeDriver: true,
            }),
          ]),
          // Delay before exit
          Animated.delay(500) as Animated.CompositeAnimation,
          // Exit animations
          Animated.parallel([
            Animated.timing(logoOpacity, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(textOpacity, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(taglineOpacity, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(backgroundOpacity, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }),
          ]),
        ]).start(async () => {
          await SplashScreen.hideAsync();
          onAnimationComplete();
        });
      } catch (e) {
        console.warn(e);
      }
    };

    animate();
  }, []);

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          opacity: backgroundOpacity,
        }
      ]}
    >
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <Animated.Image
            source={require('../assets/images/logo.png')}
            style={{
              width: width * 0.4,
              height: width * 0.4,
              resizeMode: 'contain'
            }}
          />
        </Animated.View>

        <Animated.Text
          style={[
            styles.title,
            {
              opacity: textOpacity,
              transform: [{ translateY: textTranslateY }],
            },
          ]}
        >
          SignLingo
        </Animated.Text>

        <Animated.Text
          style={[
            styles.tagline,
            {
              opacity: taglineOpacity,
              transform: [{ translateY: taglineTranslateY }],
            },
          ]}
        >
          Breaking barriers through signs
        </Animated.Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1D4044',
    marginTop: 20,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 18,
    color: '#5F8789',
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
}); 