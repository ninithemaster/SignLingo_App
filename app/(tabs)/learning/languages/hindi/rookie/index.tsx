import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function RookieScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();

  const sections = [
    {
        title: 'Introduction to Hindi',
        icon: 'language-outline',
        description: 'Learn the basics of Hindi, including Devanagari script, sounds, and greetings',
        route: '/learning/languages/hindi/rookie/introduction',
        color: '#FF7043',
      },
      {
        title: 'Hindi Alphabets',
        icon: 'leaf-outline',
        description: 'Master the Hindi vowels (स्वर) and consonants (व्यंजन)  with audio and visuals',
        route: '/learning/languages/hindi/rookie/alphabets',
        color: '#4CAF50',
      },
      {
        title: 'Common Phrases',
        icon: 'chatbubbles-outline',
        description: 'Learn basic greetings and essential phrases for everyday conversations',
        route: '/learning/languages/hindi/rookie/commonphrases',
        color: '#2196F3',
      },
      {
        title: 'Shabdkosh (Dictionary)',
        icon: 'book-outline',
        description: 'Learn common words and their meanings in Hindi with examples and audio pronunciation',
        route: '/learning/languages/hindi/rookie/shabdkosh',
        color: '#4CAF50',
      },      
      {
        title: 'Basic Sentences',
        icon: 'pencil-outline',
        description: 'Practice forming simple sentences like "My name is ___" in Hindi',
        route: '/learning/languages/hindi/rookie/basicsentences',
        color: '#9C27B0',
      },
 
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Rookie Level</Text>
      {sections.map((section, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, { backgroundColor: theme.cardBackground }]}
          onPress={() => router.push(section.route as any)}
        >
          <View style={[styles.headerContainer, { backgroundColor: section.color }]}>
            <Ionicons name={section.icon as keyof typeof Ionicons.glyphMap} size={24} color="white" />
            <Text style={styles.headerTitle}>{section.title}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={[styles.description, { color: theme.subtitle }]}>
              {section.description}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  contentContainer: {
    padding: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 1,
  },
  image: {
    width: 100, // Set width
    height: 100, // Set height
    marginBottom: 8,
  },
});
