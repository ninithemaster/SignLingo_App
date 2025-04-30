import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useRouter } from 'expo-router';

export default function GrammarIndexScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();

  const topics = [
    { title: 'Sentence Structure', route: '/learning/languages/english/rookie/grammar/sentence-structure' },
    { title: 'Articles & Gender', route: '/learning/languages/english/rookie/grammar/articles-gender' },
    { title: 'Verb Tenses', route: '/learning/languages/english/rookie/grammar/verb-tenses' },
    { title: 'Personal Pronouns', route: '/learning/languages/english/rookie/grammar/personal-pronouns' },
    { title: 'Plurals', route: '/learning/languages/english/rookie/grammar/plurals' },
    { title: 'Common Prepositions', route: '/learning/languages/english/rookie/grammar/common-prepositions' },
    { title: 'Adjectives and Adverbs', route: '/learning/languages/english/rookie/grammar/adjectives-adverbs' },
    { title: 'Question Formation', route: '/learning/languages/english/rookie/grammar/question-formation' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Grammar Essentials</Text>
      <View style={styles.cardContainer}>
        {topics.map((topic, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: theme.cardBackground }]}
            onPress={() => router.push(topic.route as any)}
          >
            <Text style={[styles.topicTitle, { color: theme.text }]}>{topic.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%', // Adjust width to fit two cards per row
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});