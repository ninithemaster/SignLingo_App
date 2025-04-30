import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import { useRouter } from 'expo-router'; // Import useRouter

export default function GreetingsIntroductionsScreen() {
  const { theme } = useAppTheme();
  const router = useRouter(); // Initialize router

  const vocabulary = [
    // Casual Greetings (with images)
    { word: 'Hello', image: require('@/assets/images/english/greetings/hello.jpg'), example: 'Hello! How are you?' },
    { word: 'Hi', image: require('@/assets/images//english/greetings/hi.jpg'), example: 'Hi! Nice to meet you.' },
    { word: 'Hey', image: require('@/assets/images//english/greetings/hey.jpg'), example: 'Hey! What’s up?' },
    { word: 'What’s up?', image: require('@/assets/images/english/greetings/whats_up.jpg'), example: 'What’s up? Long time no see!' },
    { word: 'How’s it going?', image: require('@/assets/images/english/greetings/hows_it_going.jpg'), example: 'How’s it going? You look great!' },
    { word: 'Yo!', image: require('@/assets/images/english/greetings/yo.jpg'), example: 'Yo! Ready for the party?' },

    // Formal Greetings (no images)
    { word: 'Good Morning', example: 'Good morning! Did you sleep well?' },
    { word: 'Good Afternoon', example: 'Good afternoon! How’s your day going?' },
    { word: 'Good Evening', example: 'Good evening! Hope you had a great day.' },
    { word: 'It’s a pleasure to meet you', example: 'It’s a pleasure to meet you, Dr. Sharma.' },
    { word: 'How do you do?', example: 'How do you do? I’m Mr. Patel.' },

    // Introductions (no images)
    { word: 'What is your name?', example: 'What is your name? Mine is Alex.' },
    { word: 'My name is...', example: 'My name is Nivedita. What about you?' },
    { word: 'Nice to meet you', example: 'Nice to meet you! I’ve heard a lot about you.' },
    { word: 'Let me introduce myself', example: 'Let me introduce myself. I’m the new intern.' },
    { word: 'May I introduce you to...', example: 'May I introduce you to our team leader?' },

    // Goodbyes (no images)
    { word: 'Good Night', example: 'Good night! Sleep tight.' },
    { word: 'Bye', example: 'Bye! Have a good day.' },
    { word: 'See you later', example: 'See you later! Take care.' },
    { word: 'Take care', example: 'Take care! See you soon.' },
    { word: 'Farewell', example: 'Farewell, my friend. Safe travels!' },
    { word: 'Catch you later', example: 'Catch you later, alligator!' },
    { word: 'Until next time', example: 'Until next time, keep in touch!' },

    // Welcoming (no images)
    { word: 'Welcome', example: 'Welcome to our home!' },
    { word: 'Glad to see you', example: 'Glad to see you again!' },
    { word: 'Long time no see', example: 'Long time no see! How have you been?' },
  ];

  const speakText = async (text: string) => {
    try {
      Speech.speak(text, {
        language: 'en-US',
        pitch: 1.0,
        rate: 0.8,
      });
    } catch (error) {
      console.error('Error speaking:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.text }]}>Greetings & Introductions</Text>
        </View>
        {vocabulary.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: theme.cardBackground }]}
            onPress={() => speakText(item.word)}
          >
            {item.image && <Image source={item.image} style={styles.image} />}
            <Text style={[styles.word, { color: theme.text }]}>{item.word}</Text>
            <Text style={[styles.example, { color: theme.subtitle }]}>{item.example}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 80, // Ensure space for scrolling
  },
  card: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    marginBottom: 8,
  },
  word: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  example: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
