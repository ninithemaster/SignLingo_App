import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function SentenceStructureScreen() {
  const { theme } = useAppTheme();

  const sections = [
    {
      title: 'What is Sentence Structure?',
      content: 'In English, a basic sentence usually follows the pattern:\n\nSubject + Verb + Object',
    },
    {
      title: 'Definition',
      content: 'A sentence is a group of words that expresses a complete thought. The basic structure includes:\n• Subject: Who or what the sentence is about.\n• Verb: What action the subject does.\n• Object: Who or what receives the action.',
    },
    {
      title: 'Example',
      content: 'Subject: "I"\nVerb: "eat"\nObject: "an apple"\n\nComplete Sentence: "I eat an apple."',
    },
    {
      title: 'More Examples',
      content: '• She reads a book.\n• They play football.\n• We watch movies.\n• He drinks water.',
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Sentence Structure</Text>
      {sections.map((section, index) => (
        <TouchableOpacity key={index} style={[styles.card, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.subtitle, { color: theme.text }]}>{section.title}</Text>
          <Text style={[styles.content, { color: theme.text }]}>{section.content}</Text>
        </TouchableOpacity>
      ))}
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
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});
