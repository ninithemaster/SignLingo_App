import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function RookieScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();

  const sections = [
    {
      title: 'Alphabets (स्वर/व्यंजन/Barakhadi)',
      icon: 'flag',
      description: 'Learn the basic Marathi vowels and consonants with visuals and audio.',
      route: '/learning/languages/marathi/rookie/alphabets',
      color: '#FF7043',
    },
    {
      title: 'Numbers (१-१०0)',
      icon: 'leaf',
      description: 'Master the numbers 1-100 with objects and visuals.',
      route: '/learning/languages/marathi/rookie/numbers',
      color: '#FF9800',
    },
    {
      title: 'Shabdkosh (Dictionary)',
      icon: 'book',
      description: 'Learn common words and their meanings in Marathi with examples and audio pronunciation.',
      route: '/learning/languages/marathi/rookie/shabdkosh',
      color: '#4CAF50',
    },
    {
      title: 'Greetings and Phrases',
      icon: 'chatbubble',
      description: 'Learn the most common Marathi greetings and essential phrases.',
      route: '/learning/languages/marathi/rookie/greetings',
      color: '#FF5722',
    },
    {
      title: 'Simple Questions',
      icon: 'help-circle',
      description: 'Learn how to ask simple questions in Marathi.',
      route: '/learning/languages/marathi/rookie/questions',
      color: '#8BC34A',
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Rookie Level</Text>
      <View style={styles.levelsContainer}>
        {sections.map((section, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: theme.cardBackground }]}
            onPress={() => router.push(section.route as any)}
          >
            <View style={[styles.iconContainer, { backgroundColor: section.color }]}>
              <Ionicons name={section.icon as keyof typeof Ionicons.glyphMap} size={32} color="white" />
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.levelTitle, { color: theme.text }]}>
                {section.title}
              </Text>
              <Text style={[styles.levelDescription, { color: theme.subtitle }]}>
                {section.description}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.text} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  levelsContainer: {
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  levelDescription: {
    fontSize: 14,
  },
});
