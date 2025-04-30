import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function RookieScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();

  const sections = [
    {
      title: 'Complex Sentence Structures',
      icon: 'layers-outline',
      description: 'Learn how to form compound and complex sentences in Hindi with proper conjunctions and clauses.',
      route: '/learning/languages/hindi/advanced/complexsentences',
      color: '#FF9800',
    },
    {
      title: 'Advanced Tenses',
      icon: 'flower',
      description: 'Understand the different tenses in Hindi like past perfect, future continuous, and subjunctive mood.',
      route: '/learning/languages/hindi/advanced/advancedtenses',
      color: '#8BC34A',
    },
    {
      title: 'Advanced Vocabulary',
      icon: 'glasses',
      description: 'Expand your vocabulary with idiomatic expressions, synonyms, antonyms, and phrasal verbs.',
      route: '/learning/languages/hindi/advanced/advancedvocabulary',
      color: '#9C27B0',
    },
    {
        title: 'Advanced Pronouns and Case Usage',
        icon: 'person-outline',
        description: 'Master reflexive, possessive, and object pronouns along with case usage like accusative, dative, and genitive in Hindi.',
        route: '/learning/languages/hindi/advanced/pronouns',
        color: '#4CAF50',
      },      
    {
      title: 'Literary Language and Poetry',
      icon: 'bookmarks-outline',
      description: 'Dive into Hindi literature, learn about poetic expressions, and understand famous Hindi poets.',
      route: '/learning/languages/hindi/advanced/literarylanguage',
      color: '#3F51B5',
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Advance Level</Text>
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
