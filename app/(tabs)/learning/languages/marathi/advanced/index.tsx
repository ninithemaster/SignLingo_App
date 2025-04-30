import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AdvancedScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();

  const sections = [
      {
        title: 'Tenses and Grammar',
        icon: 'create',
        description: 'Master Marathi tenses, verb conjugations, and sentence structures for fluent communication.',
        route: '/learning/languages/marathi/advanced/grammar',
        color: '#2196F3',
      },
      {
        title: 'Proverbs and Idioms',
        icon: 'bulb',
        description: 'Understand commonly used Marathi proverbs and idiomatic expressions with meanings and examples.',
        route: '/learning/languages/marathi/advanced/idioms',
        color: '#009688',
      },
      {
        title: 'Conversational Marathi',
        icon: 'people',
        description: 'Practice Marathi through real-life dialogues like visiting a market, a doctor, or giving directions.',
        route: '/learning/languages/marathi/advanced/conversations',
        color: '#4CAF50',
      },
      {
        title: 'Simple News Headlines',
        icon: 'newspaper',
        description: 'Read and understand simple Marathi news headlines to improve real-world comprehension.',
        route: '/learning/languages/marathi/advanced/newsheadlines',
        color: '#607D8B',
      },
          
  ];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.scrollContent} // Ensure contentContainerStyle is used
    >
      <Text style={[styles.title, { color: theme.text }]}>Advanced Level</Text>
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
  scrollContent: {
    paddingBottom: 20, // Ensure there's enough padding at the bottom
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  levelsContainer: {
    gap: 10,
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
