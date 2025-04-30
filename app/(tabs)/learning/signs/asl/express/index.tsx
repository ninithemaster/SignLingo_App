import { View, Text, StyleSheet, TouchableOpacity, ScrollView,ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { router } from 'expo-router';
import { Image } from 'expo-image';
type Styles = {
  container: ViewStyle;
  contentContainer: ViewStyle;
  section: ViewStyle;
  title: TextStyle;
  content: TextStyle;
  image: ImageStyle;
  exampleBox: ViewStyle;
}; 
export default function ExpressScreen() {
  const { theme } = useAppTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Animated.View 
        entering={FadeIn.delay(200)}
        style={styles.content}
      >
        {/* Camera Section */}
        <View style={[styles.sectionCard, { backgroundColor: theme.cardBackground }]}>
          <View style={[styles.iconContainer, { backgroundColor: theme.primary }]}>
            <Ionicons name="camera" size={32} color="white" />
          </View>
          <Text style={[styles.title, { color: theme.text }]}>
            Use Camera for Interactive Learning
          </Text>
          <Text style={[styles.description, { color: theme.subtitle }]}>
            Make your learning experience more engaging by using your camera to practice signs and get instant feedback.
          </Text>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={() => {
              router.push('/(tabs)/recognition');
            }}        
          >
            <Text style={styles.buttonText}>Start Camera</Text>
          </TouchableOpacity>
        </View>

        {/* GIF Section */}
        <View style={[styles.sectionCard, { backgroundColor: theme.cardBackground }]}>
          <View style={[styles.iconContainer, { backgroundColor: theme.primary }]}>
            <Ionicons name="images" size={32} color="white" />
          </View>
          <Text style={[styles.title, { color: theme.text }]}>
            Learn with GIFs
          </Text>
          <Text style={[styles.description, { color: theme.subtitle }]}>
            Visualize signs with animated GIFs to enhance your learning experience.
          </Text>
          
          {/* Example GIFs */}
          <View style={styles.gifContainer}>
            <Image source={require('@/assets/images/asl/express/happy.gif')} style={styles.gif} />
            <Image source={require('@/assets/images/asl/express/expression.gif')} style={styles.gif} />
            <Image source={require('@/assets/images/asl/express/angry.gif')} style={styles.gif} />
            <Image source={require('@/assets/images/asl/express/good.gif')} style={styles.gif} />
            <Image source={require('@/assets/images/asl/express/sad.gif')} style={styles.gif} />
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  gifContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  gif: {
    width: 100,
    height: 100,
    margin: 8,
  },
});